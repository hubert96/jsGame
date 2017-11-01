module.exports = function(grunt) {

  	// Project configuration.
	grunt.initConfig({

		browserSync: {
    		bsFiles: {
    			src : [
    			'css/*.css',
        		'*.html',
            'js/*.js'
        		]
    		},
   			options: {
   				watchTask: true,
   				server: "./",
        		server: {
           			baseDir: "./"
        		}
    		}
		},

		watch: {
    		scripts: {
        		files: ['sass/*.sass'],
        		tasks: ['sass'],
        		options: {
            		spawn: false,
            	}
        	},
    	},

		sass: {
      		options: {
        		sourceMap: true
      		},
      		dist: {
        		files: {
        			'css/main.css': 'sass/main.sass'
        		}
      		}
    	},
	
		imagemin: {
    		dynamic: {
        		files: [{
            		expand: true,
            		cwd: 'images/',
            		src: ['**/*.{png,jpg,gif}'],
            		dest: 'build/'
        		}]
    		}
		},

    jshint: {
      all: ['js/*.js']
    }

	});
  	// Load the plugins tasks
  	grunt.loadNpmTasks('grunt-sass');
  	grunt.loadNpmTasks('grunt-contrib-imagemin');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-jshint');
  	// Default task(s).
  	grunt.registerTask('default', ['imagemin', 'jshint', 'browserSync', 'watch']);

};