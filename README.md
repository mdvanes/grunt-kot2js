# grunt-kot2js

> Grunt task to convert Knockout templates to a string in a JavaScript file for the String Template Engine.

Based on https://blog.safaribooksonline.com/2014/01/31/using-external-templates-knockout-js/ and https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js

A version of the String Template Engine is included. It's located in `grunt-kot2js/lib/stringTemplateEngine.js`.

Usage of the stringTemplateEngine:

```js
function DebugViewModel() {
    this.testValues = {foo: 'bar'};
}
stringTemplateEngine.init(koTemplates);
stringTemplateEngine.getElement('TemplateA', DebugViewModel, null, null, $('#wrapper'));
```

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
# This doesn't work yet: npm install grunt-kot2js --save-dev

# add this to package.json dev-dependencies:
"grunt-kot2js": "git+http://git@github.com/mdvanes/grunt-kot2js.git"
# and run
npm install
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kot2js');
```

Although I recommend using [load-grunt-tasks](https://www.npmjs.com/package/load-grunt-tasks)

## The "kot2js" task

### Overview
In your project's Gruntfile, add a section named `kot2js` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    kot2js: {
        dev: {
            src: 'templates/*.html',
            dest: 'templates.js',
            namespace: 'foo'
        }
    }
});
```

Example output:

```js
(function () {
    'use strict';
    window.koTemplates = {};
    window.koTemplates["main"] = "<div class=\x22rdt\x22 id=\x22rdt\x22></div>";
})();
```

### Options

#### src
Type: `String`
Default value: `',  '`

Not an option, but directly in the task. Input path. Location of the HTML Knockout Templates. Expect template files to have the .html extension

#### dest
Type: `String`
Default value: `',  '`

Not an option, but directly in the task. Output path. Location of the generated JavaScript file.

#### namespace
Type: `String`
Default value: `',  '`

Not an option, but directly in the task. Optional. The variable to which the string array will be assigned. Default value is "window.koTemplates" This has to be a global variable.

### Usage Examples

#### Default Options
In this example, the sources are files with the .html extension in the `templates` dir and the generated file is `templates.js` in the root dir. The namespace is the default `window.koTemplates`.

```js
grunt.initConfig({
    kot2js: {
        dev: {
            src: 'templates/*.html',
            dest: 'templates.js'
        }
    }
});
```

## Contributing
Follow the jshintrc settings for the code style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-03-25    v0.4.0     added lib/stringTemplateEngine.js
* 2015-03-25    v0.3.0     added unit tests
* 2015-03-24    v0.2.0     input, output and namespace configurable
* 2015-03-24    v0.1.0     initial release

## To Do

* When committing got: warning: LF will be replaced by CRLF in test/expected/dev. This means that the unit test will fail.
* Publish the plugin to NPM, conform http://gruntjs.com/creating-plugins
* Add lintspaces
* Add unit test for stringTemplateEngine