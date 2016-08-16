'use strict';

describe('Component: ServicedriverComponent', function () {

  // load the controller's module
  beforeEach(module('aacrudApp'));

  var ServicedriverComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ServicedriverComponent = $componentController('servicedriver', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
