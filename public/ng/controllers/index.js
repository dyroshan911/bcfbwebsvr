'use strict';

angular.module('myApp').controller('IndexCtrl', ['$scope', '$location', '$rootScope', 'UserService', 'SessionService',
	function ($scope, $location, $rootScope, UserService, SessionService) {
		getSessionData();
		
		//functions
		$scope.onLogout = function () {
			SessionService.deleteSessionUser($rootScope.session.token, function (res) {
				$location.path('/').search('');
			}, function (res) {
				alert(res.message);
			});
		};
		
		function getSessionData() {
			if (sessionStorage) {
				$rootScope.session.token = sessionStorage.token;
				$rootScope.session.logged = sessionStorage.logged === 'true' ? true : false;
				$rootScope.session.userId = sessionStorage.userId;
				$rootScope.session.userName = sessionStorage.userName;
				$rootScope.session.role = sessionStorage.role;
			}
		}
	}]);