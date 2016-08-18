'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupController = function () {
  //end-non-standard

  function SignupController($http, Auth, $state) {
    _classCallCheck(this, SignupController);

    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
  }
  //start-non-standard


  _createClass(SignupController, [{
    key: 'register',
    value: function register(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        //      this.Auth.createUser({
        //          provider: 'local',
        //          role: 'user',
        //          name: this.user.name,
        //          email: this.user.email,
        //          password: this.user.password
        //        })
        this.$http.post('/api/users', {
          provider: 'local',
          role: 'user',
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          console.log(_this.user.name + " gggggggggg " + _this.user.email);
          // Account created, redirect to home
          _this.$state.go('main');
        }).catch(function (err) {
          err = err.data;
          _this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            _this.errors[field] = error.message;
          });
        });
      }
    }
  }, {
    key: 'register_service_provider',
    value: function register_service_provider(form) {
      var _this2 = this;

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
        }).then(function () {
          _this2.$http.post('/api/serviceproviders', {
            company_name: _this2.user.company_name,
            first_name: _this2.user.name,
            last_name: _this2.user.last_name,
            email: _this2.user.email,
            free_trial: _this2.user.free_trial,
            no_of_free_trail: _this2.user.no_of_free_trail,
            annual_app_renewal_fee: _this2.user.annual_app_renewal_fee,
            maximum_allowed_vehicle: _this2.user.maximum_allowed_vehicle,
            status: 'Pending'
          });
        }).then(function () {
          // Account created, redirect to home
          _this2.$state.go('main');
        }).catch(function (err) {
          err = err.data;
          _this2.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            _this2.errors[field] = error.message;
          });
        });
      }
    }
  }]);

  return SignupController;
}();

angular.module('aacrudApp').controller('SignupController', SignupController);
//# sourceMappingURL=signup.controller.js.map
