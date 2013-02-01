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
var history = require('history');

/**
 * Variables
 * Cached regular expressions for matching 
 * named param parts and splatted parts of route strings.
 */

var named_param = /:\w+/g;
var splat_param = /\*\w+/g;
var escape_regexp = /[-[\]{}()+?.,\\^$|#\s]/g;

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
  this.history = history;
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
 * @param {String} route route
 * @param {Function} callback callback
 * @return {Route} this for chaining
 * @api public
 */

Router.prototype.route = function (route, callback) {
  function onroute (fragment) {
    var args = this.extract_params(route, fragment);
    callback.apply(this, args);
    args.unshift('route:' + route);
    this.trigger.apply(this, args);
    this.history.trigger('route', this, route, args);
  }
  
  this.history.route(route, onroute.bind(this));
  return this;
};

/**
 * route_to_regexp
 * Convert a route string into a regular expression, 
 * suitable for matching against the current location hash.
 * 
 * @param {String} route route
 * @return {RegExp} regexp of the route
 * @api pubblic
 */

Router.prototype.route_to_regexp = function (route) {
  var route = route
    .replace(escape_regexp, '\\$&')
    .replace(named_param, '([^\/]+)')
    .replace(splat_param, '(.*?)');
  var regexp = new RegExp('^' + route + '$');
  return regexp;
};

/**
 * extract_params
 * Given a route, and a URL fragment that it matches, 
 * return the array of extracted parameters.
 * 
 * @param {String} route route
 * @param {String} fragment fragment
 * @return {Array} extracted parameters
 * @api public
 */

Route.prototype.extract_params = function (route, fragment) {
  return route.exec(fragment).slice(1);
};
