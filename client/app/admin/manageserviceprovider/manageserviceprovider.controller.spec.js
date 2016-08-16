'use strict';

describe('Component: ManageserviceproviderComponent', function () {

  // load the controller's module
  beforeEach(module('aacrudApp'));

  var ManageserviceproviderComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ManageserviceproviderComponent = $componentController('manageserviceprovider', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
