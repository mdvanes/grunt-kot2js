/**
 * Created by m.van.es on 25-3-2015.
 * sources:
 * https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js
 * https://blog.safaribooksonline.com/2014/01/31/using-external-templates-knockout-js/
 */
/* jshint browser:true */

(function (ko) {
    'use strict';

    var stringTemplateEngine = {};

    // Prepare KO to use string templates
    var initKoStringTemplates = function() {
        //define a template source that simply treats the template name as its content
        ko.templateSources.stringTemplate = function(template, templates) {
            this.templateName = template;
            this.templates = templates;
        };

        ko.utils.extend(ko.templateSources.stringTemplate.prototype, {
            data: function(key, value) {
                this.templates._data = this.templates._data || {};
                this.templates._data[this.templateName] = this.templates._data[this.templateName] || {};

                if (arguments.length === 1) {
                    return this.templates._data[this.templateName][key];
                }

                this.templates._data[this.templateName][key] = value;
            },
            text: function(value) {
                if (arguments.length === 0) {
                    return this.templates[this.templateName];
                }
                this.templates[this.templateName] = value;
            }
        });

        //modify an existing templateEngine to work with string templates
        function createStringTemplateEngine(templateEngine, templates) {
            templateEngine.makeTemplateSource = function(template) {
                return new ko.templateSources.stringTemplate(template, templates);
            };
            return templateEngine;
        }

        ko.setTemplateEngine(createStringTemplateEngine(new ko.nativeTemplateEngine(), stringTemplateEngine.templates));
    };

    stringTemplateEngine.init = function(templates) {
        stringTemplateEngine.templates = templates;
        initKoStringTemplates();
    };

    // TODO this can be removed? Just use ko.applyBindings(new ViewModel(), $parent[0]); directly?
    stringTemplateEngine.getElement = function(name, ViewModel, context, callback, $parent) {
        ko.applyBindings(new ViewModel(), $parent[0]);
    };

    window.stringTemplateEngine = stringTemplateEngine;

})(window.ko);