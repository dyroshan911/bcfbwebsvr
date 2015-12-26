'use strict';

angular.module('myApp').controller('IndexCtrl', ['$scope', '$location', '$rootScope', 'UserService', 'SessionService', 
	function ($scope, $location, $rootScope, UserService, SessionService) {
		$scope.logout = function () {
			SessionService.deleteSessionUser($rootScope.session.token, function (res) {
				$location.path('/');
			}, function (res) {

			});
		};
	}]);