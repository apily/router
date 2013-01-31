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

/*
 * Router
 * Create a collection.
 *
 * @param {Array} models models
 * @return {Collection} a collection
 */

function Router() {
  if (!(this instanceof Router)) {
    return new Router();
  }
  Emitter.call(this);
  this._routes = {};
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
 * @return {Route} this for chaining
 * @api public
 */

Router.prototype.route = function (path, name, callback) {
  this.routes[path] = callback;
  return this;
};

