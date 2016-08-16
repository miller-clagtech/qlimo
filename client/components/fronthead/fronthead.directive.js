'use strict';

angular.module('aacrudApp')
  .directive('fronthead', function() {
    return {
      templateUrl: 'components/fronthead/fronthead.html',
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('fronthead');
      }
    };
  });
