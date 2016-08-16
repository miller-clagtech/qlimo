'use strict';

class SignupController {
  //end-non-standard

  constructor($http, Auth, $state) {
      this.Auth = Auth;
      this.$state = $state;
      this.$http = $http;
    }
    //start-non-standard


  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
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
    }
  }

  register_service_provider(form) {
    this.submitted = true;

    if (form.$valid) {


//      this.Auth.createUser({
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
                company_name: this.user.company_name,
                first_name: this.user.name,
                last_name: this.user.last_name,
                email: this.user.email,
                free_trial: this.user.free_trial,
                no_of_free_trail: this.user.no_of_free_trail,
                annual_app_renewal_fee: this.user.annual_app_renewal_fee,
                maximum_allowed_vehicle: this.user.maximum_allowed_vehicle,
                status: 'Pending'
            });
        })

        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
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


    }
    
  }
  
  
  
}

angular.module('aacrudApp')
  .controller('SignupController', SignupController);
