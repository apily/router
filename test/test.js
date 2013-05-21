var Router = require('router');
var assert = require('component-assert');
var router;

describe('Route#route', function () {

  before(function () {
    router = Router();
  });

  it('should register a simple route', function (done) {
    router.get('#b', function (req) { 
      done();
    });
    router.dispatch('#a');
    router.dispatch('#b');
  });

  it('should register a parametrized route', function (done) {
    router.get('#hello/:name', function (req) { 
      assert(req.name === 'enrico');
      done();
    });
    router.dispatch('#hello/enrico');
  });

});