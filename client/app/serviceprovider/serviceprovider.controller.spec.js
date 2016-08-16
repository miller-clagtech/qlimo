'use strict';

describe('Component: ServiceproviderComponent', function () {

  // load the controller's module
  beforeEach(module('aacrudApp'));

  var ServiceproviderComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ServiceproviderComponent = $componentController('serviceprovider', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
