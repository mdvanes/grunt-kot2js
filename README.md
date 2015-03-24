# grunt-kot2js

> Grunt task to convert Knockout templates to a string in a JavaScript file for the String Template Engine.

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
            src: 'templates/*.html', // Input path. Location of the HTML Knockout Templates. Expect template files to have the .html extension
            dest: 'templates.js',    // Output path
            namespace: 'foo'         // Optional. The variable to which the string array will be assigned. Default value is "window.koTemplates" This has to be a global variable.
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

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  kot2js: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  kot2js: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-03-24    v0.2.0     input, output and namespace configurable
* 2015-03-24    v0.1.0     initial release

## TODO

* Edit documentation "Options"
* Edit documentation "Contributing"
* Add example JS of String Template Engine
* Unit tests
* Publish the plugin to NPM, conform http://gruntjs.com/creating-plugins