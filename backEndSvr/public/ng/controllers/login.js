'use strict';

angular.module('myApp').controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'UserService',
	function ($scope, $location, $rootScope, UserService) {
		$scope.loginData = {
			userName: '',
			password: ''
		};
		
		//functions
		$scope.onLogin = function () {
			var dataObj = {
				user_name: $scope.loginData.userName,
				password: $scope.loginData.password
			};
			UserService.login($rootScope.session.token, dataObj, function (res) {
				alert(JSON.stringify(res));
				$location.path('/home');
			}, function (res) {
				alert(res.message);
			})
		};
	}]);