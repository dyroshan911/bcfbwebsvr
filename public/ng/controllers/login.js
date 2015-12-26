'use strict';

angular.module('myApp').controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'UserService', 'SessionService', 
	function ($scope, $location, $rootScope, UserService, SessionService) {
		$scope.loginData = {
			userName: '',
			password: ''
		};
		
		$scope.onLogin = function () {
			UserService.login($rootScope.session.token, $scope.loginData, function (res) {
				$rootScope.session.logged = true;
				$rootScope.session.userId = res.user_id;
				$rootScope.session.userName = res.user_name;
				$rootScope.session.role = res.role;
			}, function (res) {
				alert(res.message);
			})
		};
	}]);