'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ManagevehicleComponent = function () {
    function ManagevehicleComponent(Auth, $http, $scope, $state, socket) {
      _classCallCheck(this, ManagevehicleComponent);

      this.$http = $http;
      this.socket = socket;
      this.$state = $state;

      this.vehiclesLists = [];
      this.vehicleTypeDetails = '';

      this.id = '';
      this.vehicle = '';
      this.vehicleType = '';
      this.addNew = 1;

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('vehicletype');
      });
    }

    _createClass(ManagevehicleComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/vehicless').then(function (response) {
          _this.vehiclesLists = response.data;
          _this.socket.syncUpdates('vehicles', _this.vehiclesLists);
        });
        this.$http.get('/api/vehicletypes').then(function (response) {
          _this.vehicleTypeLists = response.data;
          _this.socket.syncUpdates('vehicletype', _this.vehicleThings);
        });
      }
    }, {
      key: 'addThing',
      value: function addThing() {
        console.log("sdffdf sdf dg dfg fhfgh");
        if (this.vehicleType && this.vehicle) {
          this.$http.post('/api/vehicless', {
            vehicleType: this.vehicleType,
            vehicle: this.vehicle,
            active: 1
          });
          this.vehicleType = '';
          this.vehicle = '';
          this.socket.syncUpdates('vehicless', this.vehicleTypeLists);
        }
      }
    }, {
      key: 'updateValue',
      value: function updateValue() {
        if (this.vehicleType && this.vehicle) {
          this.$http.put('/api/vehicless/' + this.id, {
            vehicleType: this.vehicleType,
            vehicle: this.vehicle,
            active: 1
          });
          this.vehicleType = '';
          this.vehicle = '';
          this.addNew = 1;
        }
      }
    }, {
      key: 'updateThing',
      value: function updateThing(thing) {
        var _this2 = this;

        this.$http.get('/api/vehicless/' + thing._id).then(function (response) {
          console.log(response.data.name);
          _this2.id = response.data._id;
          _this2.vehicleType = response.data.vehicleType;
          _this2.vehicle = response.data.vehicle;
          _this2.addNew = 0;
        });
      }
    }, {
      key: 'changeStatus',
      value: function changeStatus(thing) {
        if (thing.active == false) {
          this.$http.put('/api/vehicless/' + thing._id, {
            active: 1
          });
        } else {
          this.$http.put('/api/vehicless/' + thing._id, {
            active: 0
          });
        }
      }
    }, {
      key: 'resetThing',
      value: function resetThing(thing) {

        this.vehicleType = '';
        this.vehicle = '';
        this.addNew = 1;
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/vehicless/' + thing._id);
      }
    }]);

    return ManagevehicleComponent;
  }();

  angular.module('aacrudApp').component('managevehicle', {
    templateUrl: 'app/admin/managevehicle/managevehicle.html',
    controller: ManagevehicleComponent,
    controllerAs: 'managevehicleCtrl'
  });
})();
//# sourceMappingURL=managevehicle.controller.js.map
