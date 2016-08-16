'use strict';

class AdminheaderController {
  //end-non-standard

  //start-non-standard
  constructor($http, Auth, $scope, $state) {
    this.$http = $http;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    $scope.state = true;
    this.serviceProviderLists = [];
  }
  
  $onInit() {
    this.$http.get('/api/serviceproviders')
    .then(response => {
      this.serviceProviderLists = response.data;
    });
}
  
  toggleState(){
      console.log("testing");
  }
  switchServiceProvider(){
      console.log( "testing " + this.switchServiceProviderData );
      this.$state.go('serviceprovider');
  }

}

angular.module('aacrudApp')
  .controller('AdminheaderController', AdminheaderController);
  