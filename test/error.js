var assert = require('assert');
var {default: parse} = require('../dist/index.js');

describe('Error messages', function() {
    it('unexpected symbol', function() {
        assert.throws(function() {
            parse('{\n    "foo": incorrect\n}', {
                source: 'path/to/file.json'
            });
        }, function(e) {
            assert.equal(e.rawMessage, 'Unexpected symbol <i> at path/to/file.json:2:12');
            assert.equal(e.source, 'path/to/file.json');
            assert.equal(e.line, 2);
            assert.equal(e.column, 12);

            return true;
        });
    });

    it('unexpected eof', function() {
        assert.throws(function() {
            parse('{\n    "foo": 123', {
                source: 'path/to/file.json'
            });
        }, function(e) {
            assert.equal(e.rawMessage, 'Unexpected end of input');
            assert.equal(e.source, 'path/to/file.json');
            assert.equal(e.line, 2);
            assert.equal(e.column, 15);

            return true;
        });
    });

    it('unexpected token', function() {
        assert.throws(function() {
            parse('{\n    "foo": 123\n}}', {
                source: 'path/to/file.json'
            });
        }, function(e) {
            assert.equal(e.rawMessage, 'Unexpected token <}> at path/to/file.json:3:2');
            assert.equal(e.source, 'path/to/file.json');
            assert.equal(e.line, 3);
            assert.equal(e.column, 2);

            return true;
        });
    });
});
