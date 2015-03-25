/*
 * grunt-kot2js
 * https://github.com/mdvanes/grunt-kot2js
 *
 * Copyright (c) 2015 M.D. van Es
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('kot2js', 'Grunt task to convert Knockout templates to a string in a JavaScript file for the String Template Engine.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var path = require('path'),
            files = grunt.file.expand(this.data.src),
            result = '(function () {\n    \'use strict\';\n',
            namespace = 'window.koTemplates';

        if(this.data.namespace) {
            namespace = this.data.namespace;
        }

        result += '    ' + namespace + ' = {};\n';

        files.forEach(function(file) {
            //strip the extension to determine a template name
            var name = path.basename(file).replace('.html', ''),
            //remove line feeds and escape quotes
                escapedContents = grunt.file.read(file).replace(/"/g , '\\x22').
                    replace(/(\r\n|\n|\r)/gm, '');

            result += '    ' + namespace + '[\"' + name + '\"] = \"' + escapedContents + '\";\n';
        });

        result += '})();';
        grunt.file.write(this.data.dest, result);

        grunt.log.writeln('Compilation to ' + this.data.dest + ' completed successfully');
    });

};
