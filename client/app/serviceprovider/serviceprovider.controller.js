'use strict';

(function(){

class ServiceproviderComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('aacrudApp')
  .component('serviceprovider', {
    templateUrl: 'app/serviceprovider/serviceprovider.html',
    controller: ServiceproviderComponent,
    controllerAs: 'serviceproviderCtrl'
  });

})();
