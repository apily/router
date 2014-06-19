/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("apily~emitter@0.1.0", function (exports, module) {
/**
 * Emitter
 * Event emitter component
 * 
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */

/**
 * Expose `Emitter`
 */
 
module.exports = Emitter;

/**
 * Utilities
 */

var array = [];
var slice = array.slice;

/**
 * @constructor Emitter
 */

function Emitter () {
  this._listeners = {};
}

/**
 * @method on
 * @description 
 *   Listen on the given `event` with `fn`.
 * 
 * @param {String} event event
 * @param {Function} callback callback
 * @param {Object} context context
 * @return {Emitter} this for chaining
 * @api public
 */

Emitter.prototype.on = function (event, callback, context) {
  var listeners 
    = this._listeners[event] 
    = this._listeners[event] || [];
   
  listeners.push({
    callback: callback,
    context: context
  });
  return this;
};

/**
 * @method off
 * @description
 *   Remove the given callback for `event` 
 *   or all registered callbacks.
 *
 * @param {String} event event
 * @param {Function} callback callback to remove
 * @return {Emitter} this for chaining
 * @api public
 */

Emitter.prototype.off = function (event, callback) {
  var listeners = this._listeners[event];
  var listener;
  var len;
  var i;
  
  if (!listener) {
   return this;
  }
  if (1 == arguments.length) {
    delete this._listeners[event];
    return this;
  }
  len = listeners.length;
  for (i = 0; i < len; i += 1) {
    listener = listeners[i];
    if (listener.callback === callback) {
      listeners.splice(i, 1);
      return this;
    }
  }

  return this;
};


/**
 * @method once
 * @description 
 *   Listen on the given `event` just once with `fn`.
 * 
 * @param {String} event event
 * @param {Function} callback callback
 * @param {Object} context context
 * @return {Emitter} this for chaining
 * @api public
 */
 
Emitter.prototype.once = function (event, callback, context) {
 var fn = function () {
   callback.call(context);
   this.off(event, fn);
 };
 this.on(event, fn, this);
 return this;
};

/**
 * @method emit
 * @description
 *   Emit `event` with the given args.
 *
 * @param {String} event event
 * @param {Mixed} ...
 * @return {Emitter} this for chaining
 */

Emitter.prototype.emit = function (event) {
  var listeners = this._listeners[event];
  var listener;
  var len;
  var i;
  var args;

  if (!listeners) {
   return this;
  }
  args = slice.call(arguments, 1);
  len = listeners.length;
  for (i = 0; i < len; i += 1) {
    listener = listeners[i];
    listener.callback.apply(listener.context, args);
  }

  return this;
};

/**
 * @method listening
 * @description
 *   Check if this emitter has `event` handlers.
 * @param {String} event event
 * @return {Boolean} 
 *   `true` if this emitter has `event` handlers,
 *   `false` otherwise
 * @api public
 */

Emitter.prototype.listening = function (event) {
  var listeners = this._listeners[event];
  return !!(listeners && listeners.length);
};

/**
 * @method listen
 * @description
 *   Listen onother event emitter
 * @param {Emitter} emitter emitter to listen to
 * @param {Event} event event to listen to
 * @param {Function} callback callback
 * @return {Emitter} this for chaining
 * @api public
 */

Emitter.prototype.listen = function (emitter, event, callback) {
  emitter.on(event, callback, this);
  return this;
};

/**
 * @method unlisten
 * @description
 *   Unlisten onother event emitter
 * @param {Emitter} emitter emitter to listen to
 * @param {Event} event event to listen to
 * @param {Function} cb callback
 * @return {Emitter} this for chaining
 * @api public
 */

Emitter.prototype.unlisten = function (emitter, event, callback) {
  emitter.off(event, callback);
  return this;
};

});

require.register("apily~route@0.1.0", function (exports, module) {
/**
 * @component route
 * @description Route component
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

module.exports = Route;

/**
 * @constructor Router
 * @description Create a router.
 * @api public
 */

function Route (path) {
  if (!(this instanceof Route)) {
    return new Route(path);
  }

  var result = this.create_regexp(path);

  this.path = path;
  this.keys = result.keys;
  this.regexp = result.regexp;
}

/**
 * @method match
 * @description test if `path` matches this route 
 * @param {String} path path to test 
 * @return {Boolean} true if `path` matches this route
 *   false otherwise
 * @api public
 */

Route.prototype.match = function (path) {
  var params = [];
  var keys = this.keys;
  var regexp = this.regexp;
  var match;
  var n;
  var i;
  var key;
  var val;

  path = path.split('?')[0];

  match = regexp.exec(path);

  if (!match) {
    return false;
  }

  match = match.splice(1);
  n = match.length;
  for (i = 0; i < n; i += 1) {
    key = keys[i];
    val = decodeURIComponent(match[i]);
    
    if (key) {
      params[key] = val;
    } else {
      params.push(val);
    }
  }

  return params;
};

/**
 * @method create_regexp
 * @description Create the regexp 
 * @param {String} path 
 * @api private
 */

Route.prototype.create_regexp = function (path, keys) {
  keys = keys || [];

  path = path
    .replace(/[\-{}\[\]+?.,\\\^$|#\s]/g, '\\$&')
    .replace(/\((.*?)\)/g, function (match, key) {
      keys.push(key);
      return '([^\/]+)?';
    })
    .replace(/:(\w+)/g, function (match, key) {
      keys.push(key);
      return '([^\/]+)';
    })
    .replace(/\*(\w*)/g, function (match, key) {
      keys.push(key);
      return '(.*?)';
    });
  
  var regexp = new RegExp('^' + path + '$');

  return { regexp: regexp, keys: keys };
};

});

require.register("router", function (exports, module) {
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
 * Component dependencies
 */

var Route = require("apily~route@0.1.0");
var Emitter = require("apily~emitter@0.1.0");

/**
 * Utils
 */

var array = [];
var slice = array.slice;
var object = {};
var toString = object.toString;

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

/**
 * Router.use
 * Use a plugin
 * 
 * @param {Function} fn plugin
 * @return {Router} Router constructor
 * @api public
 */

Router.use = function (fn) {
  fn(this);
  return this;
};

/**
 * route
 * add a route
 * 
 * @param {String} path path
 * @param {Function} callback... callback
 * @return {Route} the route of `path`
 * @api public
 */

Router.prototype.get = function (path, callback) {
  var routes = this.routes;
  var route = new Route(path);
  var args = slice.call(arguments);
  
  if (toString.call(callback) === '[object Array]') {
    callback = this.waterfall(callback);
  } else if (args.length > 2) {
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
      req.path = path;
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
  var router = this;
  return function (req) {
    var n = callbacks.length;
    var i;
    var wrapped = new Array(n);
  
    function wrap (current, next) {
      return function () { 
        current.call(router, req, next); 
      };
    }

    for (i = n-1; i >= 0; i -= 1) {
      wrapped[i] = wrap(callbacks[i], wrapped[i+1]);
    }

    wrapped[0](req);
  };
};

});

require("router")
