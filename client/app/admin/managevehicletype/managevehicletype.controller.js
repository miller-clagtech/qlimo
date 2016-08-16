'use strict';

(function(){

class ManagevehicletypeComponent {
  constructor(Auth, $http, $scope, $state, socket) {
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
      
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('vehicletype');
      });
  }
  
   $onInit() {
      
        this.$http.get('/api/vehicletypes')
        .then(response => {
          this.vehicleTypeLists = response.data;
          this.socket.syncUpdates('vehicletype', this.vehicleTypeLists);
        });
      
    }
    
    addThing() {
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
    
    updateValue() {
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
  
    updateThing(thing) {
      this.$http.get('/api/vehicletypes/' + thing._id)
        .then(response => {
          console.log(response.data.name);
          this.id = response.data._id;
          this.name = response.data.name;
          this.fareGroupType = response.data.fareGroupType;
          this.fareGroupName = response.data.fareGroupName;
          this.fareCalculatorType = response.data.fareCalculatorType;
           this.addNew = 0;
        });
    }
  
  
    changeStatus(thing) {
      if(thing.active == false){
            this.$http.put('/api/vehicletypes/' + thing._id, {
              active: 1
            });
        }else{
            this.$http.put('/api/vehicletypes/' + thing._id, {
              active: 0
            });
        }
    }
    resetThing(thing) {
      
          this.id = '';
          this.name = '';
          this.fareGroupType = '';
          this.fareGroupName = '';
          this.fareCalculatorType = '';
           this.addNew = 1;
       
    }
  
    deleteThing(thing) {
      this.$http.delete('/api/vehicletypes/' + thing._id);
    }
  
}

angular.module('aacrudApp')
  .component('managevehicletype', {
    templateUrl: 'app/admin/managevehicletype/managevehicletype.html',
    controller: ManagevehicletypeComponent,
    controllerAs: 'managevehicletypeCtrl'
  });

})();
