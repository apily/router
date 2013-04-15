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
var History = require('history');

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
  this.history = History();
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
 * @param {String} route route name
 * @param {Function} callback callback
 * @return {Route} this for chaining
 * @api public
 */

Router.prototype.route = function (route, callback) {
  var self = this;
  var history = this.history;
  var regexp = route_to_regexp(route);
  
  function onroute (fragment) {
    var params = extract_params(regexp, fragment);
    callback.apply(self, params);
  }
  
  history.route(regexp, onroute);
  return this;
};

/**
 * navigate
 * Change the location to `location`
 * 
 * @param {String} location the new location to navigate to
 * @return {Router} this for chaining
 * @api public
 */

Router.prototype.navigate = function (location) {
  window.location = location;
  return this;
};

/**
 * route_to_regexp
 * Convert a route string into a regular expression, 
 * suitable for matching against the current location hash.
 * 
 * @param {String} route route
 * @return {RegExp} regexp of the route
 */

function route_to_regexp (route) {
  var route = route
    .replace(escape_regexp, '\\$&')
    .replace(named_param, '([^\/]+)')
    .replace(splat_param, '(.*?)');
  var regexp = new RegExp('^' + route + '$');
  return regexp;
};

/**
 * extract_params
 * Given a regexp, and a URL fragment that it matches,
 * return the array of extracted parameters.
 *
 * @param {String} regexp route regexp
 * @param {String} fragment fragment
 * @return {Array} extracted parameters
 */

function extract_params (regexp, fragment) {
  return regexp.exec(fragment).slice(1);
};
