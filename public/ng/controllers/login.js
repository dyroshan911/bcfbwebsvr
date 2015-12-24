'use strict';

angular.module('myApp').controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'UserService', 'SessionService', 
	function ($scope, $location, $rootScope, UserService, SessionService) {
		$scope.loginData = {
			userName: '',
			password: ''
		};
		
		$scope.onLogin = function () {
			UserService.login($rootScope.session.token, $scope.loginData, function (res) {
				res;
			}, function (res) {
				res;
			})
		};
	}]);