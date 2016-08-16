'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminheaderController = function () {
  //end-non-standard

  //start-non-standard
  function AdminheaderController($http, Auth, $scope, $state) {
    _classCallCheck(this, AdminheaderController);

    this.$http = $http;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    $scope.state = true;
    this.serviceProviderLists = [];
  }

  _createClass(AdminheaderController, [{
    key: '$onInit',
    value: function $onInit() {
      var _this = this;

      this.$http.get('/api/serviceproviders').then(function (response) {
        _this.serviceProviderLists = response.data;
      });
    }
  }, {
    key: 'toggleState',
    value: function toggleState() {
      console.log("testing");
    }
  }, {
    key: 'switchServiceProvider',
    value: function switchServiceProvider() {
      console.log("testing " + this.switchServiceProviderData);
      this.$state.go('serviceprovider');
    }
  }]);

  return AdminheaderController;
}();

angular.module('aacrudApp').controller('AdminheaderController', AdminheaderController);
//# sourceMappingURL=adminheader.controller.js.map
