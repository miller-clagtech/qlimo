'use strict';

describe('Component: ServicevehicleComponent', function () {

  // load the controller's module
  beforeEach(module('aacrudApp'));

  var ServicevehicleComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ServicevehicleComponent = $componentController('servicevehicle', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
