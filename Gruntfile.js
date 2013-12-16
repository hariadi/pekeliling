'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      all: ['Gruntfile.js', 'tasks/*.js']
    },

    build: {
      docs: {
        files: {
          'src/data/build.json': ['pekeliling/*.pdf']
        }
      }
    },

    build_opsyen: {
      docs: {
        files: {
          'src/data/opsyen.json': ['archive/*.zip']
        }
      }
    },

    assemble: {
      options: {
        production: true,
        data: 'src/data/*.{json,yml}',
        layoutdir: 'src/layouts',
        flatten: true
      },
      site: {
        options: {
          layout: 'default.hbs'
        },
        files: {
          'pekeliling/index.html': ['src/pages/index.hbs']
        }
      }
    },

    copy: {
      main: {
        files: [
          {
            expand : true,
            cwd : 'assets/',
            src : [
              '**/*'
            ],
            dest : 'pekeliling/assets'
          }
        ]
      }
    },


    clean: ['pekeliling/assets', 'pekeliling/index.html', 'src/data/*.json'],

    compress: {

      pekeliling: {
        options: {
          archive: './pekeliling.zip',
          mode: 'zip'
        },
        files: [
          { src: './pekeliling/**' }
        ]
      },

      pp112013: { 
        options: {
          archive: './archive/opsyen_pp112013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp112013/' } ]
      },

      pp122013: { 
        options: {
          archive: './archive/opsyen_pp122013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp122013/' } ]
      },

      pp132013: { 
        options: {
          archive: './archive/opsyen_pp132013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp132013/' } ]
      },

      pp142013: { 
        options: {
          archive: './archive/opsyen_pp142013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp142013/' } ]
      },

      pp152013: { 
        options: {
          archive: './archive/opsyen_pp152013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp152013/' } ]
      },

      pp172013: { 
        options: {
          archive: './archive/opsyen_pp172013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp172013/' } ]
      },

      pp182013: { 
        options: {
          archive: './archive/opsyen_pp182013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp182013/' } ]
      },

      pp192013: { 
        options: {
          archive: './archive/opsyen_pp192013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp192013/' } ]
      },

      pp202013: { 
        options: {
          archive: './archive/opsyen_pp202013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp202013/' } ]
      },

      pp212013: { 
        options: {
          archive: './archive/opsyen_pp212013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp212013/' } ]
      },

      pp222013: { 
        options: {
          archive: './archive/opsyen_pp222013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp222013/' } ]
      },

      pp232013: { 
        options: {
          archive: './archive/opsyen_pp232013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp232013/' } ]
      },

      pp242013: { 
        options: {
          archive: './archive/opsyen_pp242013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp242013/' } ]
      },

      pp252013: { 
        options: {
          archive: './archive/opsyen_pp252013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp252013/' } ]
      },

      pp262013: { 
        options: {
          archive: './archive/opsyen_pp262013.zip', mode: 'zip' 
        },
        files: [ { expand: true, src: '**/*', cwd: 'pekeliling/opsyen/pp262013/' } ]
      }



    }


  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('assemble');

  // By default, lint and run all tests.
  grunt.registerTask('opsyen', 'Run all my build tasks.', function() {
    var opsyens = ['pp112013' ,'pp122013' ,'pp132013' ,'pp142013' ,'pp152013' ,'pp172013' ,'pp182013' ,'pp192013' ,'pp202013' ,'pp212013' ,'pp222013' ,'pp232013' ,'pp242013' ,'pp252013' ,'pp262013'];
    opsyens.forEach(function(name) {
      grunt.task.run('compress:' + name);
    });

    
  });

  grunt.registerTask('default', ['jshint', 'clean', 'opsyen', 'build', 'assemble', 'copy', 'compress:pekeliling']);
};


