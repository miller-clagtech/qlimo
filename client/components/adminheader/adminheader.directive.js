'use strict';

angular.module('aacrudApp')
  .directive('adminheader', function() {
    return {
      templateUrl: 'components/adminheader/adminheader.html',
      restrict: 'E',
      controller: 'AdminheaderController',
        controllerAs: 'headerCtrl',
      link: function(scope, element) {
        element.addClass('adminheader');
      }
    };
  });
