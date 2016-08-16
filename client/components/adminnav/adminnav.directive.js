'use strict';

angular.module('aacrudApp')
  .directive('adminnav', function() {
    return {
      templateUrl: 'components/adminnav/adminnav.html',
      restrict: 'E',
      controller: 'NavbarController',
        controllerAs: 'nav',
      link: function(scope, element) {
        element.addClass('adminnav');
      }
    };
  });
