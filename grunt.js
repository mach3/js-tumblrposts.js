
module.exports = function(grunt){

	grunt.initConfig({
		concat : {
			"dist/tumblrposts.min.js" : [
				"scripts/intro.js",
				"scripts/tumblrposts.min.js"
			],
			"dist/tumblrposts.js" : [
				"scripts/intro.js",
				"scripts/tumblrposts.js"
			]
		},
		min : {
			"scripts/tumblrposts.min.js" : ["scripts/tumblrposts.js"]
		}
	});

	grunt.registerTask("default", "min concat");


};