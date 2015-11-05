'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.kot2js = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    dev: function (test) {
        test.expect(1);
        // Don't filter out linebreaks here, because in that case you can't test for linebreaks in the correct place.
        // If the test fails because of linebreaks, check if the "expected" fixture is saved with LF linebreaks only, not CRLF.
        var actual = grunt.file.read('tmp/dev_templates.js');
        var expected = grunt.file.read('test/expected/dev');
        console.log(actual, actual);
        test.equal(actual, expected, 'should combine to string array in the window.baz variable.');

        test.done();
    }
};
