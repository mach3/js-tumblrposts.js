/*!
 * TumblrPost Class 
 * @version 1.0
 * @author mach3
 * @requires jQuery, jQuery.class.js
 */
 
 /**
 * Class for dealing with Tumblr Posts through JSONP access.
 * @class
 * @example var posts = new TumblrPosts({ domain:"example.tumblr.com", maxNum:150 });
 */
var TumblrPosts = Class.get({
	
	EVENT_COMPLETE:"complete",
	EVENT_PROGRESS:"progress",
	
	config:{
		domain: null,
		maxNum:0
	},
	
	api:"/api/read/json/",
	postsTotal:0,
	posts:[],
	allTags:null,
	tags:null,
	offset:0,
	num:50,
	
	/**
	 * Method to initialize TumblrPosts Class
	 * @constructor
	 * @param {Object} config Configuration definition.
	 */
	initialize:function( config  ){
		$.extend( this.config, config );
		this.api = ( this.config.domain ) ? "http://" + this.config.domain + this.api : this.api
	},
	/**
	 * Method to start loading Tumblr's API and reading the posts.
	 * 	Progress, or Complete event is fired.
	 * @param {Object} data Object passed by JSONP access
	 * @param {String} status Status name as string, passed by jQuery.ajax method
	 */
	run:function( data, status ){
		var s = this,
			abort = false;
		
		if( !!data ){
			this.postsTotal = data["posts-total"];
			this.offset += this.num;
			this.allTags = this.allTags || "";
			if( !data.posts.length ){
				this.trigger( this.EVENT_COMPLETE );
				return;
			}
			$.each( data.posts, function(i,p){
				if( s.config.maxNum > 0 && s.posts.length >= s.config.maxNum ){
					s.trigger( s.EVENT_COMPLETE );
					abort = true;
					return false;
				}
				s.posts.push( p );
				if( !p.tags ) return;
				s.allTags += "," + p.tags.join(",");
			});
			if( abort ){ return; }
			this.trigger( this.EVENT_PROGRESS );
		}
		
		$.ajax({
			url: this.api,
			data:{
				start:this.offset,
				num:this.num
			},
			dataType:"jsonp",
			success: function( data, status ){
				s.run( data, status );
			}
		});
	},
	/**
	 * Method to get list of tags from all the posts.
	 * @return {Array} Tags Array with objects which holds tag name and counts.
	 */
	getTags: function(){
		var s = this,
			tag_data = {};
			
		if( this.tags === null ){
			this.allTags = (this.allTags.replace(/^,/,"")).split(",");
			$.each( this.allTags, function( i, t ){
				tag_data[t] = (tag_data[t] ) ? tag_data[t] + 1 : 1;
			});
			this.tags = [];
			$.each( tag_data, function(k,n){
				s.tags.push({
					name:k,
					count:n
				});
			});
			this.tags.sort( function(a,b){
				return b.count - a.count;
			});
		}
		return this.tags;
	},
	/**
	 * Method to get list of the posts, you may use this when making the updated list.
	 * @param {Number} offset Number to start with. 
	 * @param {Number} count Count of posts you want to get.
	 * @return {Array} posts The list of posts.
	 */
	getPosts: function( o, c ){
		var offset = o || 0,
			count = c || 10,
			result = [];
		
		$.each( this.posts, function(i,p){
			if( i < offset ){ return; }
			if( i > offset + count ){ return false; }
			result.push( p );
		});
		return result;
	},
	/**
	 * Method to get Title by posts
	 * @param {Object} post Tumblr Post Object
	 * @param {Number} count Number you want to extract from the title strings.
	 * @return {String} title Title of Post
	 */
	getTitleByPost: function( post, count ){
		var title = post["regular-title"]
			|| post["photo-caption"]
			|| post["regular-body"]
			|| post["tags"][0]
			|| "" ;
		
		title = title.replace( /\<.+?\>/gi, "" );
		title = ( count ) ? title.substr( 0, count ) : title;
		return title;
	},
	/**
	 * Method to get the rate how does the loading of JSONs progress.
	 * 	You may use this when Progress event fired.
	 * @return {Number} number Integer of the rate.
	 */
	getLoadedRate:function(){
		return Math.floor( 100 * this.posts.length / 
			Math.min(this.postsTotal, (this.config.maxNum||this.postsTotal) ) );
	}
});
