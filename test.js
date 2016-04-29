'use strict';

require('mocha');
var assert = require('assert');
var getter = require('./');

describe('set-getter', function() {
  it('should export a function', function() {
    assert.equal(typeof getter, 'function');
  });

  it('should set a getter on an object', function() {
    var obj = {};
    getter(obj, 'foo', function() {
      return 'bar';
    });

    assert('foo' in obj);
    assert.equal(typeof obj.foo, 'string');
    assert.equal(obj.foo, 'bar');
  });

  it('should only call the getter once', function() {
    var calls = 0;
    var cache = {}, obj = {};

    getter(obj, 'foo', function() {
      if (cache.foo) return cache.foo;
      calls++;
      return (cache.foo = 'bar');
    });

    assert.equal(calls, 0);

    assert('foo' in obj);
    assert.equal(calls, 0);

    assert.equal(typeof obj.foo, 'string');
    assert.equal(calls, 1);

    assert.equal(obj.foo, 'bar');
    assert.equal(calls, 1);
  });

  it('should expose the object as "this" in the getter', function() {
    var obj = {abc: 'xyz'};

    getter(obj, 'foo', function() {
      assert.equal(this.abc, 'xyz');
      return 'bar';
    });

    assert('foo' in obj);
    assert.equal(typeof obj.foo, 'string');
    assert.equal(obj.foo, 'bar');
  });

  it('should add getter to an object hierarchy using dot notation', function() {
    var obj = {};
    getter(obj, 'foo.bar', function() {
      return 'beep';
    });

    getter(obj, 'foo.baz', function() {
      return 'boop';
    });

    assert('foo' in obj);
    assert.equal(typeof obj.foo, 'object');
    assert('bar' in obj.foo);
    assert('baz' in obj.foo);
    assert.equal(typeof obj.foo.bar, 'string');
    assert.equal(typeof obj.foo.baz, 'string');
    assert.equal(obj.foo.bar, 'beep');
    assert.equal(obj.foo.baz, 'boop');
  });

  it('should add getter to an object hierarchy using array notation', function() {
    var obj = {};
    getter(obj, ['foo', 'bar'], function() {
      return 'beep';
    });

    getter(obj, ['foo', 'baz'], function() {
      return 'boop';
    });

    assert('foo' in obj);
    assert.equal(typeof obj.foo, 'object');
    assert('bar' in obj.foo);
    assert('baz' in obj.foo);
    assert.equal(typeof obj.foo.bar, 'string');
    assert.equal(typeof obj.foo.baz, 'string');
    assert.equal(obj.foo.bar, 'beep');
    assert.equal(obj.foo.baz, 'boop');
  });
});
