/*
 * grunt-kot2js
 * https://github.com/mdvanes/grunt-kot2js
 *
 * Copyright (c) 2016 M.D. van Es
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('kot2js', 'Grunt task to convert Knockout templates to a string in a JavaScript file for the String Template Engine.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var path = require('path'),
            files = grunt.file.expand(this.data.src),
            result = '(function () {\n    \'use strict\';\n',
            namespace = 'window.koTemplates',
            srcRoot = this.data.srcRoot,
            prefix = this.data.prefix;

        if(this.data.namespace) {
            namespace = this.data.namespace;
        }

        var originalWorkingDir = process.cwd();
        if(srcRoot) {
            // If srcRoot is set, read files relative to srcRoot and change the reading dir to srcRoot
            files = grunt.file.expand({cwd: srcRoot}, this.data.src);
            process.chdir(this.data.srcRoot);
        }

        if(!prefix) {
            prefix = '';
        }

        result += '    ' + namespace + ' = ' + namespace + ' || {};\n';

        files.forEach(function(file) {

            // Prevent template name to start with a "."
            var dirname = '';
            if(path.dirname(file) !== '.'){
                dirname = path.dirname(file)+"/";
            }

            // Build template id
            var templateId = prefix +
                dirname +
                path.basename(file).replace('.html', '');

            var name = templateId,
            // Remove line feeds and escape quotes
            escapedContents = grunt.file.read(file)
                .replace(/"/g , '\\x22')
                .replace(/(\r\n|\n|\r)/gm, '');

            result += '    ' + namespace + '[\"' + name + '\"] = \"' + escapedContents + '\";\n';
        });

        result += '})();';

        if(srcRoot) {
            // Change back to originalWorkingDir before writing the result
            process.chdir(originalWorkingDir);
        }

        grunt.file.write(this.data.dest, result);
        grunt.log.writeln('Compilation to ' + this.data.dest + ' completed successfully');
    });
};
