(function(angular, undefined) {
  angular.module("aacrudApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"serviceProvider",
		"admin"
	]
})

;
})(angular);