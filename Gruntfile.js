'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    build: {
      docs: {
        files: {
          'src/data/build.json': ['*.pdf']
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


    clean: ['pekeliling/assets', 'pekeliling/index.html', 'src/data/build.json'],

    compress: {
      pekeliling: {
        options: {
          archive: './pekeliling.zip',
          mode: 'zip'
        },
        files: [
          { src: './pekeliling/**' }
        ]
      }
    }


  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('assemble');

  // By default, lint and run all tests.
  grunt.registerTask('default', [ 'clean', 'build', 'assemble', 'copy', 'compress']);
};


