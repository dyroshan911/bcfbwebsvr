'use strict';

angular.module('myApp').controller('IndexCtrl', ['$scope', '$location', '$rootScope', 'UsersService', 'SessionsService', 
	function ($scope, $location, $rootScope, UsersService, SessionsService) {
		$scope.logout = function () {
			SessionsService.deleteSessionUser($rootScope.session.token, function (data) {
				$location.path('/login');
			}, function (err) {
				$location.path('/login');
			});
		};
		$scope.login = function () {
			$location.path('/login');
		};
	}]);