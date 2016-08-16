'use strict';

(function(){

class ServicevehicleComponent {
  constructor($http, Auth, $scope, $state, socket) {
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
    
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('vehicles');
      });
    }
      
    $onInit() {
        
        this.$http.get('/api/servicevehicles')
        .then(response => {
          this.serviceVehicleLists = response.data;
          this.socket.syncUpdates('servicevehicle', this.serviceVehicleLists);
        });
        
        this.$http.get('/api/vehicletypes')
        .then(response => {
          this.vehicleTypeLists = response.data;
          this.socket.syncUpdates('vehicletype', this.vehicleThings);
        });
        
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
    addThing() {
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
    
    updateThing(thing) {
        this.$http.get('/api/vehicless')
        .then(response => {
          this.vehicleLists = response.data;
          this.socket.syncUpdates('vehicles', this.vehicleLists);
        });
      this.$http.get('/api/servicevehicles/' + thing._id)
        .then(response => {
          
            this.id = response.data._id;
            this.serviceProviderId = response.data.serviceProviderId;
            this.serviceProviderEmail = response.data.serviceProviderEmail;
            this.vehicleId = response.data.vehicleId;
            this.vehicleName = response.data.companyName;
            this.vehicleType = response.data.vehicleType;
            this.vehicleMake = response.data.vehicleMake;
            this.vehicleModel = response.data.vehicleModel;
            this.vehicleYear = response.data.vehicleYear;
            this.vehicleColor = response.data.vehicleColor;
            this.vehicleSitting = response.data.vehicleSitting;
            this.registrationNo = response.data.registrationNo;
            this.licencePlateNo = response.data.licencePlateNo;
            this.status = response.data.status;
        
           this.addNew = 0;
        });
        this.listView = 0;
    }
    
    updateValue() {
        
        console.log("sddg "+this.id);
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
    
     addNewItem() {
        
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
      
    manageListView() {
        this.listView = 1;
    }
    
     filterStatus(status) {
        console.log('tester == '+status)
        this.filterStatusResult = status;
    }
      
    orderRows() {
//        this.sortNameValue = this.sortName;
//        this.sortTypeValue = this.sortType;
        if(this.sortType == 'Ascending'){
            this.sortTypeValue = ''
        }else{
            this.sortTypeValue = '-'
        }
        
        if(this.sortName == 'Vehicle Id'){
            this.sortNameValue = this.sortTypeValue+'vehicleId';
        }else if(this.sortName == 'Vehicle Type'){
            this.sortNameValue = this.sortTypeValue+'vehicleType';
        }else if(this.sortName == 'Vehicle Make'){
            this.sortNameValue = this.sortTypeValue+'vehicleMake';
        }
        
    }
      
    searchRows() {
        
         if(this.searchName == 'Vehicle Id'){
            this.searchNameValue = this.sortTypeValue+'vehicleId';
            this.searchKeyValue1 = this.searchKey;
        }else if(this.searchName == 'Vehicle Type'){
            this.searchNameValue = this.sortTypeValue+'vehicleType';
            this.searchKeyValue2 = this.searchKey;
        }else if(this.searchName == 'Vehicle Make'){
            this.searchNameValue = this.sortTypeValue+'vehicleMake';
            this.searchKeyValue3 = this.searchKey;
        }
        
    }
      
    deleteThing(thing) {
      this.$http.delete('/api/servicevehicles/' + thing._id);
    }
}

angular.module('aacrudApp')
  .component('servicevehicle', {
    templateUrl: 'app/serviceprovider/servicevehicle/servicevehicle.html',
    controller: ServicevehicleComponent,
    controllerAs: 'servicevehicleCtrl'
  });

})();
