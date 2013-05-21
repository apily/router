/*
 * router
 * Router component
 *
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/*
 * Expose `Router`
 */

module.exports = Router;

/*
 * Module dependencies
 */

var Emitter = require('emitter');
var Route = require('route');

/**
 * Utils
 */

var array = [];
var slice = array.slice;

/*
 * Router
 * Create a router.
 *
 * @api public
 */

function Router() {
  if (!(this instanceof Router)) {
    return new Router();
  }
  Emitter.call(this);
  this.routes = [];
}

/*
 * Inherit from `Emitter`
 */

Router.prototype = Object.create(Emitter.prototype);
Router.prototype.constructor = Router;

/**
 * route
 * add a route
 * 
 * @param {String} path path
 * @param {Function} callback callback
 * @return {Route} the route of `path`
 * @api public
 */

Router.prototype.get = function (path, callback) {
  var routes = this.routes;
  var route = new Route(path);
  var args = slice.call(arguments);

  if (args.length > 2) {
    args.shift();
    callback = this.waterfall(args);
  }

  routes.push({ 
    regexp: route, 
    callback: callback
  });

  return route;
};

/**
 * Dispatch the given `path`,  
 * matching routes sequentially.
 *
 * @param {String} path path to dispatch
 * @param {Router} this for chaining
 * @api public
 */

Router.prototype.dispatch = function (path) {
  var routes = this.routes;
  var n = routes.length;
  var i;
  var route;
  var regexp;
  var callback;
  var params;
  var req = {};

  for (i = 0; i < n; i += 1) {
    route = routes[i];
    regexp = route.regexp;
    callback = route.callback;
    params = regexp.match(path);

    if (params) {
      req.params = params;
      callback.call(null, req);
      return this;
    }
  }

  return this;
};

/**
 * waterfall
 * @api private
 */

Router.prototype.waterfall = function (callbacks) {
  return function (req) {
    var len = callbacks.length;
    var i;
    var current;
    var next;
    var wrapped;
    var ret = [];
  
    function wrap (current, next) {
      function done () { 
        next(req); 
      }
      return function () { 
        current(req, done); 
      };
    }

    for (i = 0; i < len - 1; i += 1) {
      current = callbacks[i];
      next = callbacks[i+1];
      wrapped = wrap(current, next);
      ret.push(wrapped);
    }

    var first = ret[0];

    first(req);
  };
};