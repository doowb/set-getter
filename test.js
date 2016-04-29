'use strict';

require('mocha');
var assert = require('assert');
var setGetter = require('./');

describe('set-getter', function() {
  it('should export a function', function() {
    assert.equal(typeof setGetter, 'function');
  });

  it('should export an object', function() {
    assert(setGetter);
    assert.equal(typeof setGetter, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      setGetter();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
