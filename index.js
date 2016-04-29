/*!
 * set-getter (https://github.com/doowb/set-getter)
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('set-getter');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('set-getter')) return;

    this.define('set-getter', function() {
      debug('running set-getter');
      
    });
  };
};
