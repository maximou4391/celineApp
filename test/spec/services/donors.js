'use strict';

describe('Service: donors', function () {

  // load the service's module
  beforeEach(module('celineApp'));

  // instantiate service
  var donors;
  beforeEach(inject(function (_donors_) {
    donors = _donors_;
  }));

  it('should do something', function () {
    expect(!!donors).toBe(true);
  });

});
