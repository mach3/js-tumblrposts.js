TumblrPosts Class
=====

version:1.0

TumblrPosts is a class for dealing with tumblr posts through JSONP access.


This does
-----

- Get a list of (all) the posts from Tumblr API through JSONP access.
- Get a list of tags.
- Get a post title from "Tumblr Post" object passed by API.
- Fire the events when loading process goes, or is completed.

This requires
-----

- [jQuery](http://jquery.com)
- [jQuery.class.js](http://blog.mach3.jp/2010/09/jquery-class-js.html)

Usage
-----

  var posts = new TumblrPost({
    domain:"example.tumblr.com",
    maxNum:300
  });
  posts.bind( posts.EVENT_COMPLETE, function(e){
    var obj = this;
    $.each( this.getPosts(), function( i, post ){
      console.log( obj.getTitleByPost( post ) );
    });
    $.each( this.getTags(), function( i, tag ){
      console.log( tag.name + tag.count );
    });
  });
  posts.bind( posts.EVENT_PROGRESS, function(e){
    console.log( this.getLoadedRate() + "% Loaded" );
  });


Author
-----

- [blog.mach3.jp](http://blog.mach3.jp/)
- [follow @mach3ss](http://twitter.com/mach3ss)




