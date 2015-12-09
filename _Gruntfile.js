module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      src: {
        src: 'js/bootstrap/*.js'
      }
    },

    concat: {
      bootstrap: {
        src: [
          'js/bootstrap/transition.js',
          'js/bootstrap/alert.js',
          'js/bootstrap/button.js',
          'js/bootstrap/carousel.js',
          'js/bootstrap/collapse.js',
          'js/bootstrap/dropdown.js',
          'js/bootstrap/modal.js',
          'js/bootstrap/tooltip.js',
          'js/bootstrap/popover.js',
          'js/bootstrap/scrollspy.js',
          'js/bootstrap/tab.js',
          'js/bootstrap/affix.js'
        ],
        dest: 'dist/js/bootstrap.js'
      }
    },

    uglify: {
      bootstrap: {
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/js/bootstrap.min.js'
      }
    },

    less: {
      main: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'main.css.map',
          sourceMapFilename: 'dist/css/main.css.map'
        },
        files: {
          'dist/css/main.css': 'less/main.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/*.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      src: [
        'dist/css/*.css'
      ]
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      core: {
        files: {
          'dist/css/main.min.css': 'dist/css/main.css'
        }
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: 'dist/'
      },
      css: {
        expand: true,
        src: 'css/*',
        dest: 'dist/'
      },
      jsVendor: {
        expand: true,
        src: ['js/vendor/*.js'],
        dest: 'dist/'
      },
      jsMain: {
        expand: true,
        src: 'js/*.js',
        dest: 'dist/'
      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: '*.html'
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/img'
        }]
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: 'jshint:src'
      },
      less: {
        files: 'less/*.less',
        tasks: 'less'
      },
      img: {
        files: 'img/*',
        tasks: 'imagemin'
      },
      js : {
        files: 'js/*',
        tasks: 'dist-js'
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify', 'copy:jsVendor', 'copy:jsMain']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less-compile']);
  grunt.registerTask('dist-css', ['less', 'copy:css', 'autoprefixer', 'csscomb', 'cssmin', 'imagemin']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'copy:fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'dist']);
};
