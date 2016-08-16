'use strict';

class LoginController {
  constructor(Auth, $http, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
           
          // Logged in, redirect to home
          if(this.Auth.getCurrentUser().role == 'admin'){
            this.$state.go('admin');
          }else if(this.Auth.getCurrentUser().role == 'serviceProvider'){
            this.$state.go('serviceprovider');
          }else{
            this.$state.go('main');
          }
          
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
  
}

angular.module('aacrudApp')
  .controller('LoginController', LoginController);
