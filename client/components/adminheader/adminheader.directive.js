'use strict';

angular.module('aacrudApp').directive('adminheader', function () {
  return {
    templateUrl: 'components/adminheader/adminheader.html',
    restrict: 'E',
    controller: 'AdminheaderController',
    controllerAs: 'headerCtrl',
    link: function link(scope, element) {
      element.addClass('adminheader');
    }
  };
});
//# sourceMappingURL=adminheader.directive.js.map
