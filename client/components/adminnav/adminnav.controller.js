'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminnavController =
//end-non-standard

//start-non-standard
function AdminnavController(Auth) {
  _classCallCheck(this, AdminnavController);

  this.isLoggedIn = Auth.isLoggedIn;
  this.isAdmin = Auth.isAdmin;
  this.getCurrentUser = Auth.getCurrentUser;
};

angular.module('aacrudApp').controller('AdminnavController', AdminnavController);
//# sourceMappingURL=adminnav.controller.js.map
