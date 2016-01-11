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
				//alert(JSON.stringify(res));
				$rootScope.session.logged = true;
				$rootScope.session.userId = res.user_id;
				$rootScope.session.userName = res.true_name;
				$rootScope.session.role = res.role;
				$rootScope.session.complete = res.complete;
				$rootScope.saveSessionData();
				$location.path('/business');
			}, function (res) {
				alert(res.message);
			})
		};
	}]);