'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ServiceproviderComponent = function ServiceproviderComponent() {
    _classCallCheck(this, ServiceproviderComponent);

    this.message = 'Hello';
  };

  angular.module('aacrudApp').component('serviceprovider', {
    templateUrl: 'app/serviceprovider/serviceprovider.html',
    controller: ServiceproviderComponent,
    controllerAs: 'serviceproviderCtrl'
  });
})();
//# sourceMappingURL=serviceprovider.controller.js.map
