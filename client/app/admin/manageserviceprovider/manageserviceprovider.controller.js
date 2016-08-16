'use strict';

(function(){

class ManageserviceproviderComponent {
    
    constructor($http, Auth, $scope, $state, socket) {
      this.$http = $http;
      this.Auth = Auth;
      this.socket = socket;
      this.$state = $state;
      
      this.serviceProviderLists = [];
      this.listView = 1;
      
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('vehicles');
      });
    }
      
    $onInit() {
        this.$http.get('/api/serviceproviders')
        .then(response => {
          this.serviceProviderLists = response.data;
          this.socket.syncUpdates('serviceprovider', this.serviceProviderLists);
        });
    }
      
  registerServiceProvider(form) {
    this.submitted = true;

    if (form.$valid) {
        
//      this.Auth.createServiceProvider({
//          provider: 'local',
//          role: 'guest',
//          name: this.user.name,
//          email: this.user.email,
//          password: this.user.password
//        })
        
        this.$http.post('/api/users', {
            provider: 'local',
            role: 'serviceProvider',
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
        })
        .then(() => {
            this.$http.post('/api/serviceproviders', {
                companyName: this.user.companyName,
                firstName: this.user.name,
                lastName: this.user.lastName,
                email: this.user.email,
                registrationDate: this.user.registrationDate,
                freeTrial: this.user.freeTrial,
                noOfFreeTrail: this.user.noOfFreeTrail,
                annualAppRenewalFee: this.user.annualAppRenewalFee,
                maximumAllowedVehicle: this.user.maximumAllowedVehicle,
                status: this.user.status
            });
        })
        .then(() => {
            this.$http.put('/api/users/57ac81fc14f27b6007aecf06', {
               
                name: "Devashish"
            });
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
        this.listView = 1;
    }
  }
    addNewItem() {
        this.listView = 0;
    }
      
    manageListView() {
        this.listView = 1;
    }
    
    deleteThing(thing) {
      this.$http.delete('/api/serviceproviders/' + thing._id);
    }
  
  
}

angular.module('aacrudApp')
  .component('manageserviceprovider', {
    templateUrl: 'app/admin/manageserviceprovider/manageserviceprovider.html',
    controller: ManageserviceproviderComponent,
    controllerAs: 'manageserviceproviderCtrl'
  });

})();
