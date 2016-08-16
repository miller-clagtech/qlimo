'use strict';

angular.module('aacrudApp.auth', ['aacrudApp.constants', 'aacrudApp.util', 'ngCookies', 'ui.router']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
