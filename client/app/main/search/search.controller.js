'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var SearchController = function () {
    function SearchController($http, $scope, socket) {
      _classCallCheck(this, SearchController);

      this.$http = $http;
      this.$scope = $scope;
      this.socket = socket;
      this.vehicleLists = [];
      this.vehicleTypeLists = [];
      this.serviceproviderLists = [];
      this.message = 'Hello';
    }

    _createClass(SearchController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

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
      key: 'taxiModel',
      value: function taxiModel(item) {
        var _this2 = this;

        console.log(item + 'dfsdfsdf');
        this.$http.get('/api/vehicless').then(function (response) {
          _this2.vehicleLists = response.data;
          _this2.socket.syncUpdates('vehicles', _this2.vehicleThings);
        });
        this.vehicleType = item;
      }

      //    $scope.changedValue=function(item){
      //        console.log('dfsdfsdf');
      //    }


    }]);

    return SearchController;
  }();

  angular.module('aacrudApp').component('search', {
    templateUrl: 'app/main/search/search.html',
    controller: SearchController,
    controllerAs: 'searchCtrl'
  });
})();
//# sourceMappingURL=search.controller.js.map
