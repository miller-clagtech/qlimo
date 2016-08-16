'use strict';

describe('Component: ManagevehicleComponent', function () {

  // load the controller's module
  beforeEach(module('aacrudApp'));

  var ManagevehicleComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ManagevehicleComponent = $componentController('managevehicle', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
