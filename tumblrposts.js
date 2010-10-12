/*!
 * TumblrPost Class 
 * @version 1.1
 * @author mach3
 * @requires jQuery, jQuery.class.js
 */
 
 /**
 * Create an instance of TumblrPosts Class
 * @class Class for dealing with Tumblr Posts through JSONP access
 * @param {Object} config Configuration definition
 * @example var posts = new TumblrPosts({ domain:"example.tumblr.com", maxNum:150 });
 */
var TumblrPosts = Class.create();
TumblrPosts.prototype = {
	
	/**
	 * Name of complete event as string ( default "complete" )
	 * @constant
	 * @type String
	 */
	EVENT_COMPLETE:"complete",
	
	/**
	 * Name of progress event as string ( default "progress" )
	 * @constant
	 * @type String
	 */
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
	 * @constructor
	 * @ignore
	 */
	initialize:function( config  ){
		$.extend( this.config, config );
		this.api = ( this.config.domain ) ? "http://" + this.config.domain + this.api : this.api
	},
	
	/**
	 * Start loading Tumblr API and reading the posts.
	 * @param {Object} data Object passed by jQuery method. ( Normaly you don't need to pass )
	 * @param {String} status Status name passed by jQuery method. ( Normaly you don't need to pass )
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
	 * Get list of the tags from all the posts.
	 * @returns {Array} Tags Array with objects which holds tag name and counts.
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
	getPosts: function( offset, count ){
		var offset = offset || 0,
			count = count || 10,
			result = [];
		
		$.each( this.posts, function(i,p){
			if( i < offset ){ return; }
			if( i > offset + count ){ return false; }
			result.push( p );
		});
		return result;
	},
	
	/**
	 * Get title from the post object.
	 * @param {Object} post Tumblr Post Object
	 * @param {Number} count Character count you want to extract from the title strings.
	 * @return {String} title Title of Post
	 */
	getTitleByPost: function( post, count ){
		var title = post["regular-title"]
			|| post["photo-caption"]
			|| post["regular-body"]
			|| "" ;
		
		title = title.replace( /\<.+?\>/gi, "" );
		title = ( count ) ? title.substr( 0, count ) : title;
		return title;
	},
	
	/**
	 * Get the rate how does the loading API progress.
	 * 	You may use this when progress event fired.
	 * @return {Number} number Integer of the rate.
	 */
	getLoadedRate:function(){
		return Math.floor( 100 * this.posts.length / 
			Math.min(this.postsTotal, (this.config.maxNum||this.postsTotal) ) );
	}
};
