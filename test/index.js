var Router = require('router');
var assert = require('component-assert');
var router;

describe('Route#route', function () {

  before(function () {
    router = Router();
  });

  beforeEach(function (done) {
    console.log('start');
    window.location = '#';
    setTimeout(function () {
      router.history.start();
      done();
    }, 100);
  });

  afterEach(function (done) {
    console.log('stop');
    router.history.stop();
    done();
  });

  it('should register a simple route', function (done) {
    router.route('#a', function() { 
      console.log(arguments);
      done();
    });
    setTimeout(function () {
      window.location = '#z';
      setTimeout(function () {
        window.location = '#a';
      }, 100);
    }, 100);
  });

});
