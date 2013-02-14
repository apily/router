var Router = require('router');
var assert = require('component-assert');
var router;

describe('Route#route', function () {

  before(function () {
    router = Router();
  });

  beforeEach(function () {
    window.location = '#';
    router.history.start();
  });

  afterEach(function () {
    router.history.stop();
  });

  it('should register a simple route', function (done) {
    router.route('#b', function () { 
      done();
    });
    window.location = '#a';
    window.location = '#b';
  });

  it('should register a parametrized route', function (done) {
    router.route('#hello/:name', function (name) { 
      assert(name === 'enrico');
      done();
    });
    window.location = '#a';
    window.location = '#hello/enrico';
  });

});