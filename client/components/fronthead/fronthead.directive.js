'use strict';

angular.module('aacrudApp').directive('fronthead', function () {
  return {
    templateUrl: 'components/fronthead/fronthead.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('fronthead');
    }
  };
});
//# sourceMappingURL=fronthead.directive.js.map
