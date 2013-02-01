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
  this.history.route(route, function (fragment) {
    
  });
  return this;
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
