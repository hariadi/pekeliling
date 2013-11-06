'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    build: {
      docs: {
        files: {
          'assets/build.json': ['*.pdf']
        }
      }
    }

  });
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['build']);
};


