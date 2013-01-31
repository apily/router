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
 * Create a router.
 *
 * @api public
 */

function Router() {
  if (!(this instanceof Router)) {
    return new Router();
  }
  Emitter.call(this);
  this.routes = {};
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
 * @param {String} name name
 * @param {Function} callback callback
 * @return {Route} this for chaining
 * @api public
 */

Router.prototype.route = function (path, name, callback) {
  function onroute () {
    this.trigger('route:' + name);
    callback.apply(this, arguments);
  }
  
  this.routes[path] = onroute.bind(this);
  return this;
};
