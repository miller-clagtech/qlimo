'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ServicevehicleComponent = function () {
    function ServicevehicleComponent($http, Auth, $scope, $state, socket) {
      _classCallCheck(this, ServicevehicleComponent);

      this.$http = $http;
      this.Auth = Auth;
      this.socket = socket;
      this.$state = $state;

      this.serviceVehicleLists = [];
      this.vehicleLists = [];
      this.vehicleTypeLists = [];
      this.listView = 1;
      this.addNew = 1;
      this.loginid = 1;

      this.id = '';
      this.vehicleId = '';
      this.companyName = '';
      this.vehicleType = '';
      this.vehicleMake = '';
      this.vehicleModel = '';
      this.vehicleYear = '';
      this.vehicleColor = '';
      this.vehicleSitting = '';
      this.registrationNo = '';
      this.licencePlateNo = '';
      this.status = '';

      this.filterStatusResult = '';
      this.sortNameValue = '';
      this.sortTypeValue = '';
      this.searchNameValue = '';
      this.searchKeyValue1 = '';
      this.searchKeyValue2 = '';
      this.searchKeyValue3 = '';

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('vehicles');
      });
    }

    _createClass(ServicevehicleComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/servicevehicles').then(function (response) {
          _this.serviceVehicleLists = response.data;
          _this.socket.syncUpdates('servicevehicle', _this.serviceVehicleLists);
        });

        this.$http.get('/api/vehicletypes').then(function (response) {
          _this.vehicleTypeLists = response.data;
          _this.socket.syncUpdates('vehicletype', _this.vehicleThings);
        });
      }
    }, {
      key: 'taxiModel',
      value: function taxiModel(item) {
        var _this2 = this;

        console.log(item + 'dfsdfsdf');
        this.$http.get('/api/vehicless').then(function (response) {
          _this2.vehicleLists = response.data;
          _this2.socket.syncUpdates('vehicles', _this2.vehicleLists);
        });
        this.vehicleType = item;
      }
    }, {
      key: 'addThing',
      value: function addThing() {
        //         console.log("Concept = "+this.Auth.getCurrentUser().name);
        //        console.log(
        //                this.Auth.getCurrentUser().name+' ** '+
        //                this.companyName+' ** '+
        //                this.vehicleType+' ** '+
        //                this.vehicleMake+' ** '+
        //                this.vehicleModel+' ** '+
        //                this.vehicleColor+' ** '+
        //                this.vehicleSitting+' ** '+
        //                this.registrationNo+' ** '+
        //                this.licencePlateNo+' ** '
        //                );
        //      if (this.vehicleType && this.vehicle ) {


        this.$http.post('/api/servicevehicles', {
          serviceProviderId: this.Auth.getCurrentUser()._id,
          serviceProviderEmail: this.Auth.getCurrentUser().email,
          vehicleId: this.vehicleId,
          companyName: this.vehicleName,
          vehicleType: this.vehicleType,
          vehicleMake: this.vehicleMake,
          vehicleModel: this.vehicleModel,
          vehicleYear: this.vehicleYear,
          vehicleColor: this.vehicleColor,
          vehicleSitting: this.vehicleSitting,
          registrationNo: this.registrationNo,
          licencePlateNo: this.licencePlateNo,
          status: "Pending",
          active: 1
        });

        this.serviceProviderId = '';
        this.serviceProviderEmail = '';
        this.vehicleId = '';
        this.companyName = '';
        this.vehicleType = '';
        this.vehicleMake = '';
        this.vehicleModel = '';
        this.vehicleYear = '';
        this.vehicleColor = '';
        this.vehicleSitting = '';
        this.registrationNo = '';
        this.licencePlateNo = '';

        this.socket.syncUpdates('vehicless', this.vehicleTypeLists);
        this.listView = 1;
        //      }
      }
    }, {
      key: 'updateThing',
      value: function updateThing(thing) {
        var _this3 = this;

        this.$http.get('/api/vehicless').then(function (response) {
          _this3.vehicleLists = response.data;
          _this3.socket.syncUpdates('vehicles', _this3.vehicleLists);
        });
        this.$http.get('/api/servicevehicles/' + thing._id).then(function (response) {

          _this3.id = response.data._id;
          _this3.serviceProviderId = response.data.serviceProviderId;
          _this3.serviceProviderEmail = response.data.serviceProviderEmail;
          _this3.vehicleId = response.data.vehicleId;
          _this3.vehicleName = response.data.companyName;
          _this3.vehicleType = response.data.vehicleType;
          _this3.vehicleMake = response.data.vehicleMake;
          _this3.vehicleModel = response.data.vehicleModel;
          _this3.vehicleYear = response.data.vehicleYear;
          _this3.vehicleColor = response.data.vehicleColor;
          _this3.vehicleSitting = response.data.vehicleSitting;
          _this3.registrationNo = response.data.registrationNo;
          _this3.licencePlateNo = response.data.licencePlateNo;
          _this3.status = response.data.status;

          _this3.addNew = 0;
        });
        this.listView = 0;
      }
    }, {
      key: 'updateValue',
      value: function updateValue() {

        console.log("sddg " + this.id);
        //      if (this.id) {
        this.$http.put('/api/servicevehicles/' + this.id, {
          serviceProviderId: this.Auth.getCurrentUser()._id,
          serviceProviderEmail: this.Auth.getCurrentUser().email,
          vehicleId: this.vehicleId,
          companyName: this.vehicleName,
          vehicleType: this.vehicleType,
          vehicleMake: this.vehicleMake,
          vehicleModel: this.vehicleModel,
          vehicleYear: this.vehicleYear,
          vehicleColor: this.vehicleColor,
          vehicleSitting: this.vehicleSitting,
          registrationNo: this.registrationNo,
          licencePlateNo: this.licencePlateNo,
          status: this.status
        });

        this.vehicleId = '';
        this.companyName = '';
        this.vehicleType = '';
        this.vehicleMake = '';
        this.vehicleModel = '';
        this.vehicleYear = '';
        this.vehicleColor = '';
        this.vehicleSitting = '';
        this.registrationNo = '';
        this.licencePlateNo = '';
        this.addNew = 1;
        this.listView = 1;
        //      }
      }
    }, {
      key: 'addNewItem',
      value: function addNewItem() {

        this.id = '';
        this.serviceProviderId = '';
        this.serviceProviderEmail = '';
        this.vehicleId = '';
        this.vehicleName = '';
        this.vehicleType = '';
        this.vehicleMake = '';
        this.vehicleModel = '';
        this.vehicleYear = '';
        this.vehicleColor = '';
        this.vehicleSitting = '';
        this.registrationNo = '';
        this.licencePlateNo = '';
        this.listView = 0;
      }
    }, {
      key: 'manageListView',
      value: function manageListView() {
        this.listView = 1;
      }
    }, {
      key: 'filterStatus',
      value: function filterStatus(status) {
        console.log('tester == ' + status);
        this.filterStatusResult = status;
      }
    }, {
      key: 'orderRows',
      value: function orderRows() {
        //        this.sortNameValue = this.sortName;
        //        this.sortTypeValue = this.sortType;
        if (this.sortType == 'Ascending') {
          this.sortTypeValue = '';
        } else {
          this.sortTypeValue = '-';
        }

        if (this.sortName == 'Vehicle Id') {
          this.sortNameValue = this.sortTypeValue + 'vehicleId';
        } else if (this.sortName == 'Vehicle Type') {
          this.sortNameValue = this.sortTypeValue + 'vehicleType';
        } else if (this.sortName == 'Vehicle Make') {
          this.sortNameValue = this.sortTypeValue + 'vehicleMake';
        }
      }
    }, {
      key: 'searchRows',
      value: function searchRows() {

        if (this.searchName == 'Vehicle Id') {
          this.searchNameValue = this.sortTypeValue + 'vehicleId';
          this.searchKeyValue1 = this.searchKey;
        } else if (this.searchName == 'Vehicle Type') {
          this.searchNameValue = this.sortTypeValue + 'vehicleType';
          this.searchKeyValue2 = this.searchKey;
        } else if (this.searchName == 'Vehicle Make') {
          this.searchNameValue = this.sortTypeValue + 'vehicleMake';
          this.searchKeyValue3 = this.searchKey;
        }
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/servicevehicles/' + thing._id);
      }
    }]);

    return ServicevehicleComponent;
  }();

  angular.module('aacrudApp').component('servicevehicle', {
    templateUrl: 'app/serviceprovider/servicevehicle/servicevehicle.html',
    controller: ServicevehicleComponent,
    controllerAs: 'servicevehicleCtrl'
  });
})();
//# sourceMappingURL=servicevehicle.controller.js.map
