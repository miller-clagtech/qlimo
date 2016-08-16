'use strict';

angular.module('aacrudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('serviceprovider', {
        url: '/serviceprovider',
        template: '<serviceprovider></serviceprovider>'
      });
  });
