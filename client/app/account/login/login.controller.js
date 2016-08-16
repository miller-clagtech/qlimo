'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
  function LoginController(Auth, $http, $state) {
    _classCallCheck(this, LoginController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
  }

  _createClass(LoginController, [{
    key: 'login',
    value: function login(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(function () {

          // Logged in, redirect to home
          if (_this.Auth.getCurrentUser().role == 'admin') {
            _this.$state.go('admin');
          } else if (_this.Auth.getCurrentUser().role == 'serviceProvider') {
            _this.$state.go('serviceprovider');
          } else {
            _this.$state.go('main');
          }
        }).catch(function (err) {
          _this.errors.other = err.message;
        });
      }
    }
  }]);

  return LoginController;
}();

angular.module('aacrudApp').controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map
