'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ManageserviceproviderComponent = function () {
    function ManageserviceproviderComponent($http, Auth, $scope, $state, socket) {
      _classCallCheck(this, ManageserviceproviderComponent);

      this.$http = $http;
      this.Auth = Auth;
      this.socket = socket;
      this.$state = $state;

      this.serviceProviderLists = [];
      this.listView = 1;

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('vehicles');
      });
    }

    _createClass(ManageserviceproviderComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/serviceproviders').then(function (response) {
          _this.serviceProviderLists = response.data;
          _this.socket.syncUpdates('serviceprovider', _this.serviceProviderLists);
        });
      }
    }, {
      key: 'registerServiceProvider',
      value: function registerServiceProvider(form) {
        var _this2 = this;

        this.submitted = true;

        if (form.$valid) {

          //      this.Auth.createServiceProvider({
          //          provider: 'local',
          //          role: 'guest',
          //          name: this.user.name,
          //          email: this.user.email,
          //          password: this.user.password
          //        })

          this.$http.post('/api/users', {
            provider: 'local',
            role: 'serviceProvider',
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          }).then(function () {
            _this2.$http.post('/api/serviceproviders', {
              companyName: _this2.user.companyName,
              firstName: _this2.user.name,
              lastName: _this2.user.lastName,
              email: _this2.user.email,
              registrationDate: _this2.user.registrationDate,
              freeTrial: _this2.user.freeTrial,
              noOfFreeTrail: _this2.user.noOfFreeTrail,
              annualAppRenewalFee: _this2.user.annualAppRenewalFee,
              maximumAllowedVehicle: _this2.user.maximumAllowedVehicle,
              status: _this2.user.status
            });
          }).then(function () {
            _this2.$http.put('/api/users/57ac81fc14f27b6007aecf06', {

              name: "Devashish"
            });
          }).catch(function (err) {
            err = err.data;
            _this2.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              _this2.errors[field] = error.message;
            });
          });
          this.listView = 1;
        }
      }
    }, {
      key: 'addNewItem',
      value: function addNewItem() {
        this.listView = 0;
      }
    }, {
      key: 'manageListView',
      value: function manageListView() {
        this.listView = 1;
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/serviceproviders/' + thing._id);
      }
    }]);

    return ManageserviceproviderComponent;
  }();

  angular.module('aacrudApp').component('manageserviceprovider', {
    templateUrl: 'app/admin/manageserviceprovider/manageserviceprovider.html',
    controller: ManageserviceproviderComponent,
    controllerAs: 'manageserviceproviderCtrl'
  });
})();
//# sourceMappingURL=manageserviceprovider.controller.js.map
