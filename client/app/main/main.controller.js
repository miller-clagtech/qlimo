'use strict';

(function() {

  class MainController {

    constructor($http, $scope, $state, socket) {
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

    $onInit() {
        
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
        
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

   

    searchQuery() {
      
//         console.log(this.bookText+' = '+this.pickUpText+' = '+this.dropPointText+' = '+this.landmarkText+' = '); 
         
        if( this.pickUpText != '' && this.pickUpText != undefined  ){
         this.searchStatus = true;
         this.searchPickUpStatus = true;
        }else{
         this.searchStatus = false;
         this.searchPickUpStatus = false;
        }
        if( this.dropPointText != '' && this.dropPointText != undefined  ){
         this.searchStatus = true;
         this.searchDropPointStatus = true;
        }else{
         this.searchStatus = false;
         this.searchDropPointStatus = false;
        }
        if( this.landmarkText != '' && this.landmarkText != undefined  ){
         this.searchStatus = true;
         this.searchLandmarkStatus = true;
        }else{
         this.searchStatus = false;
         this.searchLandmarkStatus = false;
        }
//        console.log(this.searchStatus);
        
    }

     taxiModel(item){
        console.log(item + 'dfsdfsdf');
       this.$http.get('/api/vehicless')
        .then(response => {
          this.vehicleLists = response.data;
          this.socket.syncUpdates('vehicles', this.vehicleLists);
        });
        this.vehicleType = item;
        
    }
    
    selectServiceProvider(id){
        console.log('Service Provider id : ' + id);
        this.selectedServiceProviderId = id;
        this.popupServiceProvider = true;
        this.popupServiceProviderClass = 'active';
    }
    
    closePopup(){
        this.popupServiceProvider = true;
    }






     addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }
    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
    
  }

  angular.module('aacrudApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
