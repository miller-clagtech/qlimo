'use strict';

angular.module('aacrudApp').config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/account/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  }).state('logout', {
    url: '/logout?referrer',
    referrer: 'main',
    template: '',
    controller: function controller($state, Auth) {
      var referrer = $state.params.referrer || $state.current.referrer || 'main';
      Auth.logout();
      //          $state.go(referrer);
      $state.go('main');
    }
  }).state('signup', {
    url: '/signup',
    templateUrl: 'app/account/signup/signup.html',
    controller: 'SignupController',
    controllerAs: 'vm'
  }).state('signup_service_provider', {
    url: '/signup_service_provider',
    templateUrl: 'app/account/signup/signup_service_provider.html',
    controller: 'SignupController',
    controllerAs: 'vm'
  }).state('settings', {
    url: '/settings',
    templateUrl: 'app/account/settings/settings.html',
    controller: 'SettingsController',
    controllerAs: 'vm',
    authenticate: true
  });
}).run(function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
    if (next.name === 'logout' && current && current.name && !current.authenticate) {
      next.referrer = current.name;
    }
  });
});
//# sourceMappingURL=account.js.map
