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

    var capitalize = function(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    grunt.util.async.forEach(this.files, function (el, next) {

      el.src.forEach(function (file) {
        grunt.log.writeln('>> '.green + ('Loading file: ').grey + file);
				var pdf = new pdfinfo(file);
				var data = pdf.getInfoSync();

        data.path = path.basename(file);

        var title = data.title;
        var author = data.author;
        var subject = data.subject;
        var effective_date;

        var cases = path.basename(file, '.pdf');
        
        switch (cases) {
          case 'pp092013':
            effective_date = '1 Jun 2013';
            break;
          case 'pp102013':
          case 'pp112013':
          case 'pp122013':
          case 'pp132013':
            effective_date = '1 Julai 2013';
            break;
          default:
            effective_date = '1 November 2013';
            break;
        }

        var opsyen = path.join('./archive', 'opsyen_' + cases + '.zip');
        if (grunt.file.exists(opsyen)) {
          opsyen = grunt.util.normalizelf(opsyen.replace('archive\\', ''));
          data.opsyen = opsyen;
        }

        data.effective_date = effective_date;

        grunt.verbose.writeln('>> '.green + title);

        if (title) {
          data.title = capitalize(title);
        }

        if (author) {
          data.author = capitalize(author);
        }

        if (subject) {
          data.subject = capitalize(subject);
          data.bilangan = capitalize(subject).replace(/Pekeliling Perkhidmatan Bilangan /i, "").replace(/ Tahun /i, "/");
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