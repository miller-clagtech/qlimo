'use strict';

angular.module('aacrudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('servicevehicle', {
        url: '/servicevehicle',
        template: '<servicevehicle></servicevehicle>'
      });
  });
