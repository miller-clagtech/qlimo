'use strict';

(function(){

class SearchController {
  constructor($http, $scope, socket) {
      this.$http = $http;
      this.$scope = $scope;
      this.socket = socket;
      this.vehicleLists = [];
      this.vehicleTypeLists = [];
      this.serviceproviderLists = [];
    this.message = 'Hello';
   
  }
  
  $onInit() {
      
      this.$http.get('/api/vehicletypes')
        .then(response => {
          this.vehicleTypeLists = response.data;
          this.socket.syncUpdates('vehicletype', this.vehicleThings);
        });
      
          this.$http.get('/api/serviceproviders')
        .then(response => {
          this.serviceproviderLists = response.data;
          this.socket.syncUpdates('serviceprovider', this.vehicleThings);
        });
    }
    
    taxiModel(item){
        
        console.log(item + 'dfsdfsdf');
       this.$http.get('/api/vehicless')
        .then(response => {
          this.vehicleLists = response.data;
          this.socket.syncUpdates('vehicles', this.vehicleThings);
        });
        this.vehicleType = item;
        
        
    }
    
//    $scope.changedValue=function(item){
//        console.log('dfsdfsdf');
//    }
    
  
}

angular.module('aacrudApp')
  .component('search', {
    templateUrl: 'app/main/search/search.html',
    controller: SearchController,
    controllerAs: 'searchCtrl'
  });

})();
