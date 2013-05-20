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
 *  route
 *  add a route
 * 
 * @param {String} path path
 * @param {Function} callback callback
 * @return {Route} the route of `path`
 * @api public
 */

Router.prototype.get = function (path, callback, context) {
  var routes = this.routes;
  var route = new Route(path);

  routes.push({ 
    regexp: route, 
    callback: callback,
    context: context
  });

  return route;
};

/**
 * Dispatch the given `path`,  
 * matching routes sequentially.
 *
 * @param {String} path
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
  var context;
  var params;

  for (i = 0; i < n; i += 1) {
    route = routes[i];
    regexp = route.regexp;
    callback = route.callback;
    context = route.context;
    params = regexp.match(path);

    if (params) {
      callback.call(context, params);
      return this;
    }
  }

  return this;
};
