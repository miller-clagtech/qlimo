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
      this.addNew = 1;

      this.companyName = "";
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.registrationDate = "";
      this.freeTrial = "";
      this.noOfFreeTrail = "";
      this.annualAppRenewalFee = "";
      this.maximumAllowedVehicle = "";
      this.status = "";

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('serviceprovider');
      });
    }

    _createClass(ManageserviceproviderComponent, [{
      key: "$onInit",
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/serviceproviders').then(function (response) {
          _this.serviceProviderLists = response.data;
          _this.socket.syncUpdates('serviceprovider', _this.serviceProviderLists);
        });
      }
    }, {
      key: "registerServiceProvider",
      value: function registerServiceProvider(form) {
        var _this2 = this;

        this.submitted = true;
        if (!this.id) {
          if (form.$valid) {

            //      this.Auth.createServiceProvider({
            //          provider: 'local',
            //          role: 'guest',
            //          name: this.name,
            //          email: this.email,
            //          password: this.password
            //        })

            this.$http.post('/api/users', {
              provider: 'local',
              role: 'serviceProvider',
              name: this.name,
              email: this.email,
              password: this.password
            }).then(function () {
              _this2.$http.post('/api/serviceproviders', {
                companyName: _this2.companyName,
                firstName: _this2.name,
                lastName: _this2.lastName,
                email: _this2.email,
                commissionPercentage: _this2.commissionPercentage,
                commissionPerBooking: _this2.commissionPerBooking,
                commissionPerDay: _this2.commissionPerDay,
                freeTrial: _this2.freeTrial,
                noOfFreeTrail: _this2.noOfFreeTrail,
                annualAppRenewalFee: _this2.annualAppRenewalFee,
                maximumAllowedVehicle: _this2.maximumAllowedVehicle,
                status: _this2.status
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
      }
    }, {
      key: "updateValue",
      value: function updateValue() {
        //      if (this.vehicleType && this.vehicle ) {

        this.$http.put('/api/serviceproviders/' + this.id, {
          companyName: this.companyName,
          firstName: this.name,
          lastName: this.lastName,
          commissionPercentage: this.commissionPercentage,
          commissionPerBooking: this.commissionPerBooking,
          commissionPerDay: this.commissionPerDay,
          freeTrial: this.freeTrial,
          noOfFreeTrail: this.noOfFreeTrail,
          annualAppRenewalFee: this.annualAppRenewalFee,
          maximumAllowedVehicle: this.maximumAllowedVehicle,
          status: this.status
        });
        this.companyName = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.commissionPercentage = "";
        this.commissionPerBooking = "";
        this.commissionPerDay = "";
        this.freeTrial = "";
        this.noOfFreeTrail = "";
        this.annualAppRenewalFee = "";
        this.maximumAllowedVehicle = "";
        this.status = "";
        this.addNew = 1;
        //      }
      }
    }, {
      key: "updateThing",
      value: function updateThing(thing) {
        console.log("ssssssssssss");
        this.addNew = 0;
        //      this.$http.get('/api/serviceproviders/' + thing._id)
        //        .then(response => {
        this.id = thing._id;
        this.companyName = thing.companyName;
        this.name = thing.firstName;
        this.lastName = thing.lastName;
        this.email = thing.email;
        this.commissionPercentage = thing.commissionPercentage;
        this.commissionPerBooking = thing.commissionPerBooking;
        this.commissionPerDay = thing.commissionPerDay;
        this.registrationDate = thing.registrationDate;
        this.freeTrial = thing.freeTrial;
        this.noOfFreeTrail = thing.noOfFreeTrail;
        this.annualAppRenewalFee = thing.annualAppRenewalFee;
        this.maximumAllowedVehicle = thing.maximumAllowedVehicle;
        this.status = thing.status;

        //        });
        this.listView = 0;
      }
    }, {
      key: "changeStatus",
      value: function changeStatus(thing) {
        if (thing.status === 'Pending') {
          this.$http.put('/api/serviceproviders/' + thing._id, {
            status: "Approved"
          });
        } else {
          this.$http.put('/api/serviceproviders/' + thing._id, {
            status: "Pending"
          });
        }
      }
    }, {
      key: "addNewItem",
      value: function addNewItem() {
        this.companyName = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.commissionPercentage = "";
        this.commissionPerBooking = "";
        this.commissionPerDay = "";
        this.freeTrial = "";
        this.noOfFreeTrail = "";
        this.annualAppRenewalFee = "";
        this.maximumAllowedVehicle = "";
        this.status = "";
        this.listView = 0;
      }
    }, {
      key: "manageListView",
      value: function manageListView() {
        this.listView = 1;
      }
    }, {
      key: "deleteThing",
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
