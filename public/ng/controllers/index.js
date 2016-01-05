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

		$scope.saveSessionData = function () {
			sessionStorage.logged = $rootScope.session.logged;
			sessionStorage.userId = $rootScope.session.userId;
			sessionStorage.userName = $rootScope.session.userName;
			sessionStorage.role = $rootScope.session.role;
		};
	}]);