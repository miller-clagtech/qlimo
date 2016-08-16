'use strict';

(function(){

class ServicedriverComponent {
  constructor($http, Auth, $scope, $state, socket) {
      this.$http = $http;
      this.Auth = Auth;
      this.socket = socket;
      this.$state = $state;
      
      this.driverLists = [];
      this.vehicleLists = [];
      this.vehicleTypeLists = [];
      this.listView = 1;
      this.addNew = 1;
      
      this.id = '';
      this.driverId = '';
      this.firstName = '';
      this.lastName = '';
      this.mobileNo = '';
      this.email = '';
      this.rpNo = '';
      this.bankAcNo = '';
      this.profilePicture = '';
      this.totalRequest = '';
      this.acceptanceRate = '';
      this.status = '';
    
      this.filterStatusResult = '';
      this.sortNameValue = '';
        this.sortTypeValue = '';
        this.searchNameValue = '';
        this.searchKeyValue1 = '';
        this.searchKeyValue2 = '';
        this.searchKeyValue3 = '';
        this.searchKeyValue4 = '';
    
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('vehicles');
      });
    }
      
    $onInit() {
        
        this.$http.get('/api/drivers')
        .then(response => {
          this.driverLists = response.data;
          this.socket.syncUpdates('driver', this.driverLists);
        });
        
        
        
    }
   
    addThing() {


        this.$http.post('/api/drivers', {
          serviceProviderId: this.Auth.getCurrentUser()._id,
          serviceProviderEmail: this.Auth.getCurrentUser().email,
          driverId: this.driverId,
          firstName: this.firstName,
          lastName: this.lastName,
          mobileNo: this.mobileNo,
          email: this.email,
          rpNo: this.rpNo,
          bankAcNo: this.bankAcNo,
          profilePicture: this.profilePicture,
          totalRequest: this.totalRequest,
          acceptanceRate: this.acceptanceRate,
          status: 'Pending',
          active: 1
        });
        
        
        this.driverId = '';
        this.firstName = '';
        this.lastName = '';
        this.mobileNo = '';
        this.email = '';
        this.rpNo = '';
        this.bankAcNo = '';
        this.profilePicture = '';
        this.totalRequest = '';
        this.acceptanceRate = '';
        this.status = '';
        
        this.socket.syncUpdates('vehicless', this.vehicleTypeLists);
        this.listView = 1;

    }
    
    updateThing(thing) {
        this.$http.get('/api/vehicless')
        .then(response => {
          this.vehicleLists = response.data;
          this.socket.syncUpdates('vehicles', this.vehicleLists);
        });
      this.$http.get('/api/drivers/' + thing._id)
        .then(response => {
          
            this.id = response.data._id;
            this.serviceProviderId = response.data.serviceProviderId;
            this.serviceProviderEmail = response.data.serviceProviderEmail;
            this.driverId = response.data.driverId;
            this.firstName = response.data.firstName;
            this.lastName = response.data.lastName;
            this.mobileNo = response.data.mobileNo;
            this.email = response.data.email;
            this.rpNo = response.data.rpNo;
            this.bankAcNo = response.data.bankAcNo;
            this.profilePicture = response.data.profilePicture;
            this.totalRequest = response.data.totalRequest;
            this.acceptanceRate = response.data.acceptanceRate;
            this.status = response.data.status;
        
           this.addNew = 0;
        });
        this.listView = 0;
    }
    
    updateValue() {
        
        console.log("sddg "+this.id);

        this.$http.put('/api/drivers/' + this.id, {
          serviceProviderId: this.Auth.getCurrentUser()._id,
          serviceProviderEmail: this.Auth.getCurrentUser().email,
          driverId: this.driverId,
          firstName: this.firstName,
          lastName: this.lastName,
          mobileNo: this.mobileNo,
          email: this.email,
          rpNo: this.rpNo,
          bankAcNo: this.bankAcNo,
          profilePicture: this.profilePicture,
          totalRequest: this.totalRequest,
          acceptanceRate: this.acceptanceRate,
          status: this.status,
          active: 1
        });
        
        this.driverId = '';
        this.firstName = '';
        this.lastName = '';
        this.mobileNo = '';
        this.email = '';
        this.rpNo = '';
        this.bankAcNo = '';
        this.profilePicture = '';
        this.totalRequest = '';
        this.acceptanceRate = '';
        this.status = '';
        this.addNew = 1;
         this.listView = 1;

    }
    
     addNewItem() {
        
        this.id = '';
        this.serviceProviderId = '';
        this.serviceProviderEmail = '';
        this.driverId = '';
        this.firstName = '';
        this.lastName = '';
        this.mobileNo = '';
        this.email = '';
        this.rpNo = '';
        this.bankAcNo = '';
        this.profilePicture = '';
        this.totalRequest = '';
        this.acceptanceRate = '';
        this.status = '';
        this.listView = 0;
    }
      
    manageListView() {
        this.listView = 1;
    }
    
    orderRows() {
        if(this.sortType == 'Ascending'){
            this.sortTypeValue = ''
        }else{
            this.sortTypeValue = '-'
        }
        
        if(this.sortName == 'Driver Id'){
            this.sortNameValue = this.sortTypeValue+'driverId';
        }else if(this.sortName == 'Driver Name'){
            this.sortNameValue = this.sortTypeValue+'firstName';
        }else if(this.sortName == 'Driver Mobile'){
            this.sortNameValue = this.sortTypeValue+'mobileNo';
        }else if(this.sortName == 'Driver Email Id'){
            this.sortNameValue = this.sortTypeValue+'email';
        }
        
    }
      
    searchRows() {
        
         if(this.searchName == 'Driver Id'){
            this.searchNameValue = this.sortTypeValue+'driverId';
            this.searchKeyValue1 = this.searchKey;
        }else if(this.searchName == 'Driver Name'){
            this.searchNameValue = this.sortTypeValue+'firstName';
            this.searchKeyValue2 = this.searchKey;
        }else if(this.searchName == 'Driver Mobile'){
            this.searchNameValue = this.sortTypeValue+'mobileNo';
            this.searchKeyValue3 = this.searchKey;
        }else if(this.searchName == 'Driver Email Id'){
            this.searchNameValue = this.sortTypeValue+'email';
            this.searchKeyValue4 = this.searchKey;
        }
        this.searchKeyValue = this.searchKey;
    }
      
    filterStatus(status) {
        console.log('tester == '+status)
        this.filterStatusResult = status;
    }
      
    deleteThing(thing) {
      this.$http.delete('/api/drivers/' + thing._id);
    }
}

angular.module('aacrudApp')
  .component('servicedriver', {
    templateUrl: 'app/serviceprovider/servicedriver/servicedriver.html',
    controller: ServicedriverComponent,
    controllerAs: 'servicedriverCtrl'
  });

})();
