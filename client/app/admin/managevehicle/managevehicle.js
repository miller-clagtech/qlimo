'use strict';

angular.module('aacrudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('managevehicle', {
        url: '/managevehicle',
        template: '<managevehicle></managevehicle>'
      });
  });
