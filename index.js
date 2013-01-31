
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
}

/*
 * Inherit from `Emitter`
 */

Router.prototype = Object.create(Emitter.prototype);
Router.prototype.constructor = Router;

