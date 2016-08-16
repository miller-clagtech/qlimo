'use strict';

describe('Component: ManagevehicletypeComponent', function () {

  // load the controller's module
  beforeEach(module('aacrudApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var ManagevehicletypeComponent;
  var state;
  var $httpBackend

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $http, $componentController, $rootScope, $state,
    socket) {
        $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/managevehicletypes')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    
    ManagevehicletypeComponent = $componentController('managevehicletype', {
        $http: $http,
      $scope: scope,
      socket: socket
    });
  }));

  it('should ...', function () {
      ManagevehicletypeComponent.$onInit();
      $httpBackend.flush();
      expect(ManagevehicletypeComponent.vehicleTypeLists.length)
      .to.equal(1);
  });
});
