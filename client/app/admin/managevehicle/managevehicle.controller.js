'use strict';

(function(){

class ManagevehicleComponent {
    
 constructor(Auth, $http, $scope, $state, socket) {
      this.$http = $http;
      this.socket = socket;
      this.$state = $state;
      
      this.vehiclesLists = [];
      this.vehicleTypeDetails = '';
      
      this.id = '';
      this.vehicle = '';
      this.vehicleType = '';
      this.addNew = 1;
      
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('vehicletype');
      });
  }
      
  $onInit() {
        this.$http.get('/api/vehicless')
        .then(response => {
          this.vehiclesLists = response.data;
          this.socket.syncUpdates('vehicles', this.vehiclesLists);
        });
        this.$http.get('/api/vehicletypes')
        .then(response => {
          this.vehicleTypeLists = response.data;
          this.socket.syncUpdates('vehicletype', this.vehicleThings);
        });
    }
    
    addThing() {
        console.log("sdffdf sdf dg dfg fhfgh");
      if (this.vehicleType && this.vehicle ) {
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
    
    updateValue() {
      if (this.vehicleType && this.vehicle ) {
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
  
    updateThing(thing) {
      this.$http.get('/api/vehicless/' + thing._id)
        .then(response => {
          console.log(response.data.name);
           this.id = response.data._id;
           this.vehicleType = response.data.vehicleType;
           this.vehicle = response.data.vehicle;
           this.addNew = 0;
        });
    }
  
    changeStatus(thing) {
      if(thing.active == false){
            this.$http.put('/api/vehicless/' + thing._id, {
              active: 1
            });
        }else{
            this.$http.put('/api/vehicless/' + thing._id, {
              active: 0
            });
        }
    }
  
    resetThing(thing) {
      
          this.vehicleType = '';
          this.vehicle = '';
           this.addNew = 1;
       
    }
  
    deleteThing(thing) {
      this.$http.delete('/api/vehicless/' + thing._id);
    }
    
}

angular.module('aacrudApp')
  .component('managevehicle', {
    templateUrl: 'app/admin/managevehicle/managevehicle.html',
    controller: ManagevehicleComponent,
    controllerAs: 'managevehicleCtrl'
  });

})();
