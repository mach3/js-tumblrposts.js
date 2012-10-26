

describe("TumblrPosts", function() {

	it("on/off/trigger() : aliase to jQuery.on/off/trigger", function() {
		var t, stack, func;

		t = new TumblrPosts;
		stack = [];
		func = {
			a : function(){
				stack.push("a");
			},
			b : function(){
				stack.push("b");
			}
		};

		t.on("test", func.a);
		t.on("test", func.b);
		t.trigger("test");
		t.off("test", func.b);
		t.trigger("test");

		expect(stack).toEqual(["a", "b", "a"]);
	});

	it("bind/unbind() : aliase to on/off", function(){
		var t, stack, func;
		
		t = new TumblrPosts;
		stack = [];
		func = {
			a : function(){
				stack.push("a");
			},
			b : function(){
				stack.push("b");
			}
		};

		t.bind("test", func.a);
		t.bind("test", func.b);
		t.trigger("test");
		t.unbind("test", func.b);
		t.trigger("test");

		expect(stack).toEqual(["a", "b", "a"]);

	});

	it("config() : set/get option", function(){
		var t = new TumblrPosts;

		t.config({
			domain : "mach3ss.tumblr.com",
			maxNum : 50
		});
		expect(t.config("url")).toEqual("http://mach3ss.tumblr.com/api/read/json/");
		expect(t.config("maxNum")).toEqual(50);
	});

	it("run() : start to load resource", function(){

		var t = new TumblrPosts;
		var done = false;
		var progress = [];

		t.config({
			domain : "mach3ss.tumblr.com",
			maxNum : 80
		});
		t.on(t.EVENT_COMPLETE, function(){
			done = true;
		});
		t.on(t.EVENT_PROGRESS, function(){
			progress.push(new Date);
		});
		t.run();

		waitsFor(function(){
			return done;
		});

		runs(function(){

			var $ul = $("<ul>");
			$.each(t.getTags(), function(i, tag){
				$ul.append(
					$("<li>").text(tag.name + "(" + tag.count + ")")
				);
			});
			console.log($ul);


			expect(t.posts.length).toEqual(80);
			expect(t.getPosts(3,10).length).toEqual(10);
			expect(t.getTags().length > 0).toEqual(true);
			expect(t.getTitleByPost(t.getPosts()[0], 5).length).toEqual(5);
			expect(progress.length > 0).toEqual(true);
		});
	});

	it("getTags(order) : get tags sorted by count", function(){
		var t = new TumblrPosts;
		var getNames = function(tags){
			var i, names = [];
			for(i=0; i<tags.length; i+=1){
				names.push(tags[i].name);
			}
			return names;
		};
		t.tags = [
			{ name : "foo", count : 3},
			{ name : "bar", count : 1},
			{ name : "baz", count : 2},
			{ name : "qux", count : 4}
		];
		expect(getNames(t.getTags("asc"))).toEqual(["bar", "baz", "foo", "qux"]);
		expect(getNames(t.getTags("desc"))).toEqual(["qux", "foo", "baz", "bar"]);
	});

});