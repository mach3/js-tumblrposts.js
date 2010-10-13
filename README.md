TumblrPosts Class
=====

version:1.1

TumblrPosts is a class for dealing with tumblr posts through JSONP access.

This does
-----

- Get a list of (all) the posts from Tumblr API through JSONP access.
- Get a list of tags.
- Get a post title from "Tumblr Post" object passed by API.
- Fire the events when loading process goes, or is completed.

Requires
-----

- [jQuery](http://jquery.com)
- [jQuery.class.js](http://github.com/mach3/js-jquery-class)

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
	posts.run();


Method
-----

test
: test

	
Author
-----

- [blog.mach3.jp](http://blog.mach3.jp/)
- [follow @mach3ss](http://twitter.com/mach3ss)


License
-----
The MIT License

Copyright (c) 2010, matsukaze.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.