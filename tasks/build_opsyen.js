'use strict';
var crypto = require('crypto');
var path = require('path');
var pdfinfo = require('pdfinfojs');
var fs = require('fs');

module.exports = function (grunt) {

  grunt.registerMultiTask('build_opsyen', 'Build opsyen data', function () {

    var options = this.options({
      encoding: 'utf8',
      algorithm: 'sha1',
      indent: 2
    });
    var dest = this.files[0].dest;
    var build = {};

    grunt.util.async.forEach(this.files, function (el, next) {

      el.src.forEach(function (file) {
        grunt.log.writeln('>> '.green + ('Loading file: ').grey + file);

        var data = {};

        data.path = path.basename(file);

        try {
          var stat = fs.lstatSync(file);
          data.created = stat.atime;
        } catch (err) {
          
        }

        data[options.algorithm] = crypto.createHash(options.algorithm).update(grunt.file.read(file), options.encoding).digest('hex');
        build[grunt.util.normalizelf(file)] = data;

        console.log(data);
      });
      next();
    }, this.async());


    grunt.file.write(dest, JSON.stringify(build, null, options.indent));
    grunt.log.writeln('>> '.green + dest.grey + (' has been created!'));

    
  });
};