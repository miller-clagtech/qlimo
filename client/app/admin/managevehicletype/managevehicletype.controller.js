'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ManagevehicletypeComponent = function () {
    function ManagevehicletypeComponent(Auth, $http, $scope, $state, socket) {
      _classCallCheck(this, ManagevehicletypeComponent);

      this.$http = $http;
      this.socket = socket;
      this.$state = $state;

      this.vehicleTypeLists = [];
      this.vehicleTypeDetails = '';

      this.id = '';
      this.name = '';
      this.fareGroupType = '';
      this.fareGroupName = '';
      this.fareCalculatorType = '';
      this.addNew = 1;

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('vehicletype');
      });
    }

    _createClass(ManagevehicletypeComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/vehicletypes').then(function (response) {
          _this.vehicleTypeLists = response.data;
          _this.socket.syncUpdates('vehicletype', _this.vehicleTypeLists);
        });
      }
    }, {
      key: 'addThing',
      value: function addThing() {
        if (this.name && this.fareGroupType && this.fareGroupName && this.fareCalculatorType) {
          this.$http.post('/api/vehicletypes', {
            name: this.name,
            fareGroupType: this.fareGroupType,
            fareGroupName: this.fareGroupName,
            fareCalculatorType: this.fareCalculatorType,
            active: 1
          });
          this.name = '';
          this.fareGroupType = '';
          this.fareGroupName = '';
          this.fareCalculatorType = '';
          this.socket.syncUpdates('vehicletype', this.vehicleTypeLists);
        }
      }
    }, {
      key: 'updateValue',
      value: function updateValue() {
        if (this.name && this.fareGroupType && this.fareGroupName && this.fareCalculatorType) {
          this.$http.put('/api/vehicletypes/' + this.id, {
            name: this.name,
            fareGroupType: this.fareGroupType,
            fareGroupName: this.fareGroupName,
            fareCalculatorType: this.fareCalculatorType,
            active: 1
          });
          this.id = '';
          this.name = '';
          this.fareGroupType = '';
          this.fareGroupName = '';
          this.fareCalculatorType = '';
          this.addNew = 1;
        }
      }
    }, {
      key: 'updateThing',
      value: function updateThing(thing) {
        var _this2 = this;

        this.$http.get('/api/vehicletypes/' + thing._id).then(function (response) {
          console.log(response.data.name);
          _this2.id = response.data._id;
          _this2.name = response.data.name;
          _this2.fareGroupType = response.data.fareGroupType;
          _this2.fareGroupName = response.data.fareGroupName;
          _this2.fareCalculatorType = response.data.fareCalculatorType;
          _this2.addNew = 0;
        });
      }
    }, {
      key: 'changeStatus',
      value: function changeStatus(thing) {
        if (thing.active == false) {
          this.$http.put('/api/vehicletypes/' + thing._id, {
            active: 1
          });
        } else {
          this.$http.put('/api/vehicletypes/' + thing._id, {
            active: 0
          });
        }
      }
    }, {
      key: 'resetThing',
      value: function resetThing(thing) {

        this.id = '';
        this.name = '';
        this.fareGroupType = '';
        this.fareGroupName = '';
        this.fareCalculatorType = '';
        this.addNew = 1;
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/vehicletypes/' + thing._id);
      }
    }]);

    return ManagevehicletypeComponent;
  }();

  angular.module('aacrudApp').component('managevehicletype', {
    templateUrl: 'app/admin/managevehicletype/managevehicletype.html',
    controller: ManagevehicletypeComponent,
    controllerAs: 'managevehicletypeCtrl'
  });
})();
//# sourceMappingURL=managevehicletype.controller.js.map
