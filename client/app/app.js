'use strict';

var myapp = angular.module('aacrudApp', ['aacrudApp.auth', 'aacrudApp.admin', 'aacrudApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngMaterial']);
myapp.controller('AppCtrl', ['$scope', function ($scope) {
  $scope.custom = true;
  $scope.toggleCustom = function () {
    $scope.custom = $scope.custom === false ? true : false;
  };
}]);
myapp.config(function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
});

//var myapp = angular.module('adminApp', ['ngMaterial']);
/************************
Book Cap Now Select Box
*************************/

myapp.controller('bookcapnow', function ($timeout, $scope) {
  $scope.book = null;
  $scope.books = null;
  return $timeout(function () {
    $scope.books = $scope.books || [{ id: 1, name: 'SCHEDULE A CAB' }, { id: 2, name: 'BOOK CAB NOW' }];
  }, 650);
});

/************************
Select Taxi Type
*************************/

function taxiCtrl($timeout, $q, $log) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled = false;
  // list of `taxi` value/display objects
  self.taxis = loadAll();
  self.querySearch = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange = searchTextChange;
  self.newtaxi = newtaxi;
  function newtaxi(taxi) {
    alert("Sorry! You'll need to create a Constituion for " + taxi + " first!");
  }
  // ******************************
  // Internal methods
  // ******************************
  /**
   * Search for taxis... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch(query) {
    var results = query ? self.taxis.filter(createFilterFor(query)) : self.taxis,
        deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(results);
      }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  /**
   * Build `taxis` list of key/value pairs
   */
  function loadAll() {
    var alltaxis = 'Taxi, SUV, Limousine, Luxury Limousine';
    return alltaxis.split(/, +/g).map(function (taxi) {
      return {
        value: taxi.toLowerCase(),
        display: taxi
      };
    });
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(taxi) {
      return taxi.value.indexOf(lowercaseQuery) === 0;
    };
  }
}
myapp.controller('selecttaxitype', taxiCtrl);

/************************
Select Manufacturer
*************************/

function manufacturerCtrl($timeout, $q, $log) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled = false;
  // list of `manufacturer` value/display objects
  self.manufacturers = loadAll();
  self.querySearch = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange = searchTextChange;
  self.newmanufacturer = newmanufacturer;
  function newmanufacturer(manufacturer) {
    alert("Sorry! You'll need to create a Constituion for " + manufacturer + " first!");
  }
  // ******************************
  // Internal methods
  // ******************************
  /**
   * Search for manufacturers... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch(query) {
    var results = query ? self.manufacturers.filter(createFilterFor(query)) : self.manufacturers,
        deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(results);
      }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  /**
   * Build `manufacturers` list of key/value pairs
   */
  function loadAll() {
    var allmanufacturers = 'Cadillac XTS Limousine, Chrysler 300 Limousine, Hyundai Equus Limousine, Toyota Century Royal';
    return allmanufacturers.split(/, +/g).map(function (manufacturer) {
      return {
        value: manufacturer.toLowerCase(),
        display: manufacturer
      };
    });
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(manufacturer) {
      return manufacturer.value.indexOf(lowercaseQuery) === 0;
    };
  }
}
myapp.controller('selectmanufacturer', manufacturerCtrl);

/************************
Service Provider Popup
*************************/

function serviceproviderpop($mdDialog) {
  var self = this;

  self.openDialog = function ($event) {
    $mdDialog.show({
      controller: DialogCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'serviceproviderpop.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true
    });
  };
}

function DialogCtrl($timeout, $q, $scope, $mdDialog) {
  var self = this;
  self.cancel = function ($event) {
    $mdDialog.cancel();
  };
}
myapp.controller('serviceproviderpop', serviceproviderpop);
/************************
No Result Popup
*************************/

function noresult($mdDialog) {
  var self = this;

  self.openDialog = function ($event) {
    $mdDialog.show({
      controller: DialogCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'noresult.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true
    });
  };
}

function DialogCtrl($timeout, $q, $scope, $mdDialog) {
  var self = this;
  self.cancel = function ($event) {
    $mdDialog.cancel();
  };
}
myapp.controller('noresult', noresult);
/************************
Login Popup
*************************/

function login($mdDialog) {
  var self = this;

  self.openDialog = function ($event) {
    $mdDialog.show({
      controller: DialogCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'login.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true
    });
  };
}

function DialogCtrl($timeout, $q, $scope, $mdDialog) {
  var self = this;
  self.cancel = function ($event) {
    $mdDialog.cancel();
  };
}
myapp.controller('login', login);
/************************
Book Cap Now Select Box
*************************/

myapp.controller('paymentcontrol', function ($timeout, $scope) {
  $scope.payment = null;
  $scope.payments = null;
  return $timeout(function () {
    $scope.payments = $scope.payments || [{ id: 1, name: 'CARD' }, { id: 2, name: 'COD' }];
  }, 650);
});

/************************
Promo Code Popup
*************************/

function promocode($mdDialog) {
  var self = this;

  self.openDialog = function ($event) {
    $mdDialog.show({
      controller: DialogCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'promocode.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true
    });
  };
}

function DialogCtrl($timeout, $q, $scope, $mdDialog) {
  var self = this;
  self.cancel = function ($event) {
    $mdDialog.cancel();
  };
}
myapp.controller('promocode', promocode);

/************************
Booking Confirmed Popup
*************************/

function confirmed($mdDialog) {
  var self = this;

  self.openDialog = function ($event) {
    $mdDialog.show({
      controller: DialogCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'confirmed.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true
    });
  };
}

function DialogCtrl($timeout, $q, $scope, $mdDialog) {
  var self = this;
  self.cancel = function ($event) {
    $mdDialog.cancel();
  };
}

myapp.controller('confirmed', confirmed);

/**********************************
 * 
 ***********************************/

myapp.directive('modalDialog', function () {
  return {
    restrict: 'E',
    scope: {
      show: '=info'
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function link(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width) scope.dialogStyle.width = attrs.width;
      if (attrs.height) scope.dialogStyle.height = attrs.height;
      scope.hideModal = function () {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

myapp.controller('MyCtrl', ['$scope', function ($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function () {
    $scope.modalShown = !$scope.modalShown;
  };
  $scope.modalShown1 = false;
  $scope.toggleModal1 = function () {
    $scope.modalShown1 = !$scope.modalShown1;
  };
}]);

/******************************************************
 *  USE OF CARDOVA JS
 ******************************************************/
/*
 
myapp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


myapp.directive('googleplace', function() {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
      details: '=?'
    },
    controller: function($scope) {
      //$scope.gPlace;
      console.log("....1");
    },

    link: function(scope, element, attrs, model) {
      var options = {
        types: [],
        componentRestrictions: {}
      };
      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

      google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
        console.log("....2");
        scope.$apply(function() {
          scope.details = scope.gPlace.getPlace();
          console.log(scope.details.geometry.location.lat());
          model.$setViewValue(element.val());
        });
      });
    }
  };
});

myapp.controller('MapCtrl', function($scope, $ionicLoading, $compile, $cordovaGeolocation, $ionicPlatform, $ionicModal) {
  $scope.gPlace;
  $ionicModal.fromTemplateUrl('googleplace.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalGooglePlace = modal;
    // $scope.modal.show();
  });
  $scope.openGooglePlace = function() {

    $scope.modalGooglePlace.show();
  }
  $scope.closeGooglePlaceModal = function() {
    $scope.modalGooglePlace.hide();
  }
});

*/
//# sourceMappingURL=app.js.map
