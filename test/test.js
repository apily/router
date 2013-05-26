var Router = require('router');
var assert = require('component-assert');
var router;

describe('Route#route', function () {

  beforeEach(function () {
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
      var params = req.params;
      assert(params.name === 'enrico');
      done();
    });
    router.dispatch('#hello/enrico');
  });

  it('should pass to the next callback', function (done) {
    router.get('#users/:user_id', 
      function (req, next) { 
        var params = req.params;
        assert(params.user_id === '007');
        req.secret = true;
        next();
      }, 
      function (req) {
        assert(req.secret);
        done();
      });

    router.dispatch('#users/007');
  });

  it('should pass more than 2 callbacks', function (done) {
    router.get('#count', 
      function (req, next) { 
        req.n = 1;
        next();
      }, 
      function (req, next) {
        req.n += 1;
        assert(req.n === 2);
        next();
      },
      function (req, next) {
        req.n += 1;
        assert(req.n === 3);
        done();
      });

    router.dispatch('#count');
  });


});