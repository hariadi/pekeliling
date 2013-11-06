'use strict';
var crypto = require('crypto');
var path = require('path');
var pdfinfo = require('pdfinfojs');

module.exports = function (grunt) {

  grunt.registerMultiTask('build', 'File revisioning based on content hashing', function () {

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
				var pdf = new pdfinfo(file);
				var data = pdf.getInfoSync();

        var title = data.title;
        var author = data.author;
        var subject = data.author;

        grunt.verbose.writeln('>> '.green + title);

        if (title) {
          data.title = capitalize(title);
        }

        if (author) {
          data.author = capitalize(author);
        }

        if (subject) {
          data.subject = capitalize(subject);
        }

				data[options.algorithm] = crypto.createHash(options.algorithm).update(grunt.file.read(file), options.encoding).digest('hex');
				build[grunt.util.normalizelf(file)] = data;
      });
      next();
    }, this.async());

    grunt.file.write(dest, JSON.stringify(build, null, options.indent));
    grunt.log.writeln('>> '.green + dest.grey + (' has been created!'));
  });
};

var capitalize = function(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
