'use strict';

angular.module('aacrudApp').directive('adminnav', function () {
  return {
    templateUrl: 'components/adminnav/adminnav.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav',
    link: function link(scope, element) {
      element.addClass('adminnav');
    }
  };
});
//# sourceMappingURL=adminnav.directive.js.map
