'use strict';

angular.module('myApp').controller('IndexCtrl', ['$scope', '$location', '$rootScope', 'UserService', 'SessionService',
	function ($scope, $location, $rootScope, UserService, SessionService) {
		//functions
		$scope.onLogout = function () {
			SessionService.deleteSessionUser($rootScope.session.token, function (res) {
				$location.path('/').search('');
			}, function (res) {
				alert(res.message);
			});
		};
	}]);