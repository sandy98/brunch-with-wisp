(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("initialize", function(exports, require, module) {
  var utils = require("lib/utils");
  module.exports.utils = utils;

  $(function() {
    return $("form").on("submit", function(ev) {
      ev.preventDefault ?
        ev.preventDefault() :
        void(0);
      $("#factorial").text(utils.factorial(parseInt($("#txt-n").val())));
      $("#sqrt").text(utils.sqrt(parseInt($("#txt-n").val())));
      return false;
    });
  })
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var version = "0.0.5";
  module.exports.version = version;

  var factorial = function(n) {
    return n < 2 ?
      1 :
      n * (factorial(n - 1));
  };
  module.exports.factorial = factorial;

  var average = function(v1, v2) {
    return (v1 + v2) / 2;
  };
  module.exports.average = average;

  var square = function(n) {
    return n * n;
  };
  module.exports.square = square;

  var abs = function(n) {
    return n < 0 ?
      -1 * n :
      n;
  };
  module.exports.abs = abs;

  var sqrt = function(n) {
    var improve = function(guess) {
      return average(guess, n / guess);
    };
    var isGoodEnough = function(guess) {
      return abs((square(guess)) - n) < 1e-10;
    };
    var tryit = function(guess) {
      return isGoodEnough(guess) ?
        guess :
        tryit(improve(guess));
    };
    return tryit(1);
  };
  module.exports.sqrt = sqrt
  
});
