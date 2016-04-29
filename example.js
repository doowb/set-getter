'use strict';

var toPath = require('to-object-path');
var getter = require('./');

/**
 * Normal getters on an object. Just returning strings.
 */

var obj = {};

// root level property
getter(obj, 'foo', function() {
  return 'bar';
});
console.log(obj.foo);

// property dot notation
getter(obj, 'bar.baz', function() {
  return 'qux';
});
console.log(obj.bar.baz);

// property array notation
getter(obj, ['beep', 'boop'], function() {
  return 'bop';
});
console.log(obj.beep.boop);

/**
 * Advanced getter that caches results to ensure work is only done once.
 */

var lazy = function(requireFn) {
  var cache = {};
  return function fn(name, alias) {
    var key = toPath(alias || name);
    return getter(fn, alias || name, function() {
      return cache[key] || (cache[key] = requireFn(name));
    });
  };
};

var calls = {};
var utils = lazy(function(key) {
  calls[key] = (calls[key] || 0) + 1;
  return key.toUpperCase();
});

utils('foo');
utils('qux', 'bar.baz');
utils('bop', ['beep', 'boop']);

// show that the lazy getter function is only called once for each property.
console.log(utils.foo, utils.foo);
console.log(utils.bar.baz, utils.bar.baz);
console.log(utils.beep.boop, utils.beep.boop);
console.log(calls);
