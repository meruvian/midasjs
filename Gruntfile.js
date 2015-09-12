// Generated on 2015-02-16 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		midas: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= midas.app %>/**/*.js'],
				tasks: ['injector', 'newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			jsTest: {
				files: ['<%= midas.app %>/**/*.spec.js'],
				tasks: ['newer:jshint:test', 'karma']
			},
			styles: {
				files: ['<%= midas.app %>/**/*.css'],
				tasks: [ 'injector', 'newer:copy:styles', 'autoprefixer']
			},
			dev: {
				files: [
						'<%= midas.app %>/*.{ico,png,txt}',
						'<%= midas.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= midas.app %>/fonts/{,*/}*.*'
				],
				tasks: ['newer:copy:dev']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= midas.app %>/**/*.html',
					'.tmp/**/*.css',
					'<%= midas.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 8081,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '0.0.0.0',
				livereload: 35729
			},
			proxies: [
				{
					context: '/',
					host: 'yama2.meruvian.org',
					port: 80,
					headers: {
						host: 'yama2.meruvian.org'
					}
				}
			],
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						appConfig.app
					],
					middleware: function (connect) {
						// Setup the proxy
						var middlewares = [
							connect.static('.tmp'),
							connect().use( '/bower_components', connect.static('./bower_components')),
							connect.static(appConfig.app),
							proxySnippet
						];

						return middlewares;
					}
				}
			},
			test: {
				options: {
					port: 9002,
					base: [
						'.tmp',
						'test',
						appConfig.app
					]
					// ,
					// middleware: function (connect) {
					// 	return [
					// 		connect.static('.tmp'),
					// 		connect.static('test'),
					// 		connect().use(
					// 			'/bower_components',
					// 			connect.static('./bower_components')
					// 		),
					// 		connect.static(appConfig.app)
					// 	];
					// }
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= midas.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			config: {
				src: 'Gruntfile.js'
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= midas.app %>/**/*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['<%= midas.app %>/**/*.spec.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= midas.dist %>/{,*/}*',
						'!<%= midas.dist %>/.git{,*/}*'
					]
				}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			server: {
				options: {
					map: true,
				},
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '**/*.css',
					dest: '.tmp/styles/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '**/*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= midas.app %>/**/*.html'],
				ignorePath:  /\.\.\//
			},
			test: {
				devDependencies: true,
				src: '<%= karma.unit.configFile %>',
				ignorePath:	/\.\.\//,
				fileTypes:{
					js: {
						block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
							detect: {
								js: /'(.*\.js)'/gi
							},
							replace: {
								js: '\'{{filePath}}\','
							}
						}
					}
			}
		},

		// Automatically inject scripts and styles into the app
		injector: {
			options: {
				ignorePath: '<%= midas.app %>',
				addRootSlash: false
			},
			local_dependencies: {
				files: {
					'<%= midas.app %>/index.html': [
						'<%= midas.app %>/**/*.js',
						'!<%= midas.app %>/main/app.js',
						'!<%= midas.app %>/components/oauth2/oauth2.js',
						'!<%= midas.app %>/frontend/register/*.js',
						'<%= midas.app %>/**/*.css'
					],
				}
			}
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= midas.dist %>/scripts/{,*/}*.js',
					'<%= midas.dist %>/styles/{,*/}*.css',
					'<%= midas.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'!<%= midas.dist %>/images/default_profile.gif',
					'<%= midas.dist %>/styles/fonts/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= midas.app %>/index.html',
			options: {
				dest: '<%= midas.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= midas.dist %>/**/*.html'],
			css: ['<%= midas.dist %>/**/*.css'],
			options: {
				assetsDirs: [
					'<%= midas.dist %>',
					'<%= midas.dist %>/images',
					'<%= midas.dist %>/styles'
				]
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//	 dist: {
		//		 files: {
		//			 '<%= midas.dist %>/styles/main.css': [
		//				 '.tmp/styles/{,*/}*.css'
		//			 ]
		//		 }
		//	 }
		// },
		// uglify: {
		//	 dist: {
		//		 files: {
		//			 '<%= midas.dist %>/scripts/scripts.js': [
		//				 '<%= midas.dist %>/scripts/scripts.js'
		//			 ]
		//		 }
		//	 }
		// },
		// concat: {
		//	 dist: {}
		// },

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= midas.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= midas.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= midas.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= midas.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= midas.dist %>',
					src: ['*.html', '**/*.html'],
					dest: '<%= midas.dist %>'
				}]
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= midas.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= midas.app %>',
					dest: '<%= midas.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'**/*.html',
						'images/{,*/}*.{webp}',
						'styles/fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= midas.dist %>/images',
					src: ['generated/*']
				}, {
					expand: true,
					cwd: 'bower_components/bootstrap/dist',
					src: 'fonts/*',
					dest: '<%= midas.dist %>'
				}, {
					expand: true,
					cwd: 'bower_components/font-awesome',
					src: 'fonts/*',
					dest: '<%= midas.dist %>'
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= midas.app %>',
				dest: '.tmp/styles/',
				src: '**/*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			dev: [
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
		}
	});


	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:dev',
			'wiredep',
			'injector',
			'jshint:config',
			'autoprefixer:server',
			'configureProxies',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'wiredep',
		'injector',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'wiredep',
		'injector',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'cdnify',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
};
