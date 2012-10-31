
module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib");

	grunt.initConfig({

		clean : {
			dist : [
				"dist/tumblrposts.min.js",
				"dist/tumblrposts.js"
			]
		},

		meta : {
			banner : grunt.file.read("scripts/banner.js")
		},

		min : {
			"dist/tumblrposts.min.js" : ["<banner>", "scripts/tumblrposts.js"]
		},

		concat : {
			dist : {
				dest : "dist/tumblrposts.js",
				src : ["<banner>", "scripts/tumblrposts.js"],
				separator : ""
			}
		}
	});

	grunt.registerTask("default", "clean concat min");

};
