'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http, $scope, $state, socket) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.socket = socket;
      this.$state = $state;

      this.awesomeThings = [];
      this.vehicleLists = [];
      this.vehicleTypeLists = [];
      this.serviceproviderLists = [];

      this.message = 'Hello';
      this.searchStatus = false;
      this.searchPickUpStatus = true;
      this.searchDropPointStatus = true;
      this.searchLandmarkStatus = true;
      this.popupServiceProvider = false;
      this.popupServiceProviderClass = '';

      //      $scope.$on('$destroy', function() {
      //        socket.unsyncUpdates('thing');
      //      });
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/things').then(function (response) {
          _this.awesomeThings = response.data;
          _this.socket.syncUpdates('thing', _this.awesomeThings);
        });

        this.$http.get('/api/vehicletypes').then(function (response) {
          _this.vehicleTypeLists = response.data;
          _this.socket.syncUpdates('vehicletype', _this.vehicleThings);
        });

        this.$http.get('/api/serviceproviders').then(function (response) {
          _this.serviceproviderLists = response.data;
          _this.socket.syncUpdates('serviceprovider', _this.vehicleThings);
        });
      }
    }, {
      key: 'searchQuery',
      value: function searchQuery() {

        //         console.log(this.bookText+' = '+this.pickUpText+' = '+this.dropPointText+' = '+this.landmarkText+' = '); 

        if (this.pickUpText != '' && this.pickUpText != undefined) {
          this.searchStatus = true;
          this.searchPickUpStatus = true;
        } else {
          this.searchStatus = false;
          this.searchPickUpStatus = false;
        }
        if (this.dropPointText != '' && this.dropPointText != undefined) {
          this.searchStatus = true;
          this.searchDropPointStatus = true;
        } else {
          this.searchStatus = false;
          this.searchDropPointStatus = false;
        }
        if (this.landmarkText != '' && this.landmarkText != undefined) {
          this.searchStatus = true;
          this.searchLandmarkStatus = true;
        } else {
          this.searchStatus = false;
          this.searchLandmarkStatus = false;
        }
        //        console.log(this.searchStatus);
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
      key: 'selectServiceProvider',
      value: function selectServiceProvider(id) {
        console.log('Service Provider id : ' + id);
        this.selectedServiceProviderId = id;
        this.popupServiceProvider = true;
        this.popupServiceProviderClass = 'active';
      }
    }, {
      key: 'closePopup',
      value: function closePopup() {
        this.popupServiceProvider = true;
      }
    }, {
      key: 'addThing',
      value: function addThing() {
        if (this.newThing) {
          this.$http.post('/api/things', {
            name: this.newThing
          });
          this.newThing = '';
        }
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/things/' + thing._id);
      }
    }]);

    return MainController;
  }();

  angular.module('aacrudApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });
})();
//# sourceMappingURL=main.controller.js.map
