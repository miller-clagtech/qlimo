'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var ServicedriverComponent = function () {
        function ServicedriverComponent($http, Auth, $scope, $state, socket) {
            _classCallCheck(this, ServicedriverComponent);

            this.$http = $http;
            this.Auth = Auth;
            this.socket = socket;
            this.$state = $state;

            this.driverLists = [];
            this.vehicleLists = [];
            this.vehicleTypeLists = [];
            this.listView = 1;
            this.addNew = 1;

            this.id = '';
            this.driverId = '';
            this.firstName = '';
            this.lastName = '';
            this.mobileNo = '';
            this.email = '';
            this.rpNo = '';
            this.bankAcNo = '';
            this.profilePicture = '';
            this.totalRequest = '';
            this.acceptanceRate = '';
            this.status = '';

            this.filterStatusResult = '';
            this.sortNameValue = '';
            this.sortTypeValue = '';
            this.searchNameValue = '';
            this.searchKeyValue1 = '';
            this.searchKeyValue2 = '';
            this.searchKeyValue3 = '';
            this.searchKeyValue4 = '';

            $scope.$on('$destroy', function () {
                socket.unsyncUpdates('vehicles');
            });
        }

        _createClass(ServicedriverComponent, [{
            key: '$onInit',
            value: function $onInit() {
                var _this = this;

                this.$http.get('/api/drivers').then(function (response) {
                    _this.driverLists = response.data;
                    _this.socket.syncUpdates('driver', _this.driverLists);
                });
            }
        }, {
            key: 'addThing',
            value: function addThing() {

                this.$http.post('/api/drivers', {
                    serviceProviderId: this.Auth.getCurrentUser()._id,
                    serviceProviderEmail: this.Auth.getCurrentUser().email,
                    driverId: this.driverId,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    mobileNo: this.mobileNo,
                    email: this.email,
                    rpNo: this.rpNo,
                    bankAcNo: this.bankAcNo,
                    profilePicture: this.profilePicture,
                    totalRequest: this.totalRequest,
                    acceptanceRate: this.acceptanceRate,
                    status: 'Pending',
                    active: 1
                });

                this.driverId = '';
                this.firstName = '';
                this.lastName = '';
                this.mobileNo = '';
                this.email = '';
                this.rpNo = '';
                this.bankAcNo = '';
                this.profilePicture = '';
                this.totalRequest = '';
                this.acceptanceRate = '';
                this.status = '';

                this.socket.syncUpdates('vehicless', this.vehicleTypeLists);
                this.listView = 1;
            }
        }, {
            key: 'updateThing',
            value: function updateThing(thing) {
                var _this2 = this;

                this.$http.get('/api/vehicless').then(function (response) {
                    _this2.vehicleLists = response.data;
                    _this2.socket.syncUpdates('vehicles', _this2.vehicleLists);
                });
                this.$http.get('/api/drivers/' + thing._id).then(function (response) {

                    _this2.id = response.data._id;
                    _this2.serviceProviderId = response.data.serviceProviderId;
                    _this2.serviceProviderEmail = response.data.serviceProviderEmail;
                    _this2.driverId = response.data.driverId;
                    _this2.firstName = response.data.firstName;
                    _this2.lastName = response.data.lastName;
                    _this2.mobileNo = response.data.mobileNo;
                    _this2.email = response.data.email;
                    _this2.rpNo = response.data.rpNo;
                    _this2.bankAcNo = response.data.bankAcNo;
                    _this2.profilePicture = response.data.profilePicture;
                    _this2.totalRequest = response.data.totalRequest;
                    _this2.acceptanceRate = response.data.acceptanceRate;
                    _this2.status = response.data.status;

                    _this2.addNew = 0;
                });
                this.listView = 0;
            }
        }, {
            key: 'updateValue',
            value: function updateValue() {

                console.log("sddg " + this.id);

                this.$http.put('/api/drivers/' + this.id, {
                    serviceProviderId: this.Auth.getCurrentUser()._id,
                    serviceProviderEmail: this.Auth.getCurrentUser().email,
                    driverId: this.driverId,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    mobileNo: this.mobileNo,
                    email: this.email,
                    rpNo: this.rpNo,
                    bankAcNo: this.bankAcNo,
                    profilePicture: this.profilePicture,
                    totalRequest: this.totalRequest,
                    acceptanceRate: this.acceptanceRate,
                    status: this.status,
                    active: 1
                });

                this.driverId = '';
                this.firstName = '';
                this.lastName = '';
                this.mobileNo = '';
                this.email = '';
                this.rpNo = '';
                this.bankAcNo = '';
                this.profilePicture = '';
                this.totalRequest = '';
                this.acceptanceRate = '';
                this.status = '';
                this.addNew = 1;
                this.listView = 1;
            }
        }, {
            key: 'addNewItem',
            value: function addNewItem() {

                this.id = '';
                this.serviceProviderId = '';
                this.serviceProviderEmail = '';
                this.driverId = '';
                this.firstName = '';
                this.lastName = '';
                this.mobileNo = '';
                this.email = '';
                this.rpNo = '';
                this.bankAcNo = '';
                this.profilePicture = '';
                this.totalRequest = '';
                this.acceptanceRate = '';
                this.status = '';
                this.listView = 0;
            }
        }, {
            key: 'manageListView',
            value: function manageListView() {
                this.listView = 1;
            }
        }, {
            key: 'orderRows',
            value: function orderRows() {
                if (this.sortType == 'Ascending') {
                    this.sortTypeValue = '';
                } else {
                    this.sortTypeValue = '-';
                }

                if (this.sortName == 'Driver Id') {
                    this.sortNameValue = this.sortTypeValue + 'driverId';
                } else if (this.sortName == 'Driver Name') {
                    this.sortNameValue = this.sortTypeValue + 'firstName';
                } else if (this.sortName == 'Driver Mobile') {
                    this.sortNameValue = this.sortTypeValue + 'mobileNo';
                } else if (this.sortName == 'Driver Email Id') {
                    this.sortNameValue = this.sortTypeValue + 'email';
                }
            }
        }, {
            key: 'searchRows',
            value: function searchRows() {

                if (this.searchName == 'Driver Id') {
                    this.searchNameValue = this.sortTypeValue + 'driverId';
                    this.searchKeyValue1 = this.searchKey;
                } else if (this.searchName == 'Driver Name') {
                    this.searchNameValue = this.sortTypeValue + 'firstName';
                    this.searchKeyValue2 = this.searchKey;
                } else if (this.searchName == 'Driver Mobile') {
                    this.searchNameValue = this.sortTypeValue + 'mobileNo';
                    this.searchKeyValue3 = this.searchKey;
                } else if (this.searchName == 'Driver Email Id') {
                    this.searchNameValue = this.sortTypeValue + 'email';
                    this.searchKeyValue4 = this.searchKey;
                }
                this.searchKeyValue = this.searchKey;
            }
        }, {
            key: 'filterStatus',
            value: function filterStatus(status) {
                console.log('tester == ' + status);
                this.filterStatusResult = status;
            }
        }, {
            key: 'deleteThing',
            value: function deleteThing(thing) {
                this.$http.delete('/api/drivers/' + thing._id);
            }
        }]);

        return ServicedriverComponent;
    }();

    angular.module('aacrudApp').component('servicedriver', {
        templateUrl: 'app/serviceprovider/servicedriver/servicedriver.html',
        controller: ServicedriverComponent,
        controllerAs: 'servicedriverCtrl'
    });
})();
//# sourceMappingURL=servicedriver.controller.js.map
