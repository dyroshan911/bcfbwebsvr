'use strict';

angular.module('myApp').controller('SignupCtrl', ['$scope', '$location', '$rootScope', 'UserService', 
	function ($scope, $location, $rootScope, UserService) {
		$scope.signupData = {
			userName: '',
			password: '',
			passwordConfirm: '',
			phone: '',
			name: '',
			email: '',
			superior: '',
			checkPassword: true
		};
		
		//functions
		$scope.onSignup = function () {
			if ($scope.signupForm.$invalid || !$scope.signupData.checkPassword) {
				return;
			}
			var dataOdj = {
				user_name: $scope.signupData.userName,
				password: $scope.signupData.passwordConfirm,
				phone: $scope.signupData.phone,
				true_name : $scope.signupData.name,
				email : $scope.signupData.email,
				superior: $scope.signupData.superior
			};
			UserService.signup($rootScope.session.token, dataOdj, function (res) {
				alert(JSON.stringify(res));
				var dataObj = {
					user_name: $scope.signupData.userName,
					password: $scope.signupData.passwordConfirm,
				};
				UserService.login($rootScope.session.token, dataObj, function (res) {
					$rootScope.session.logged = true;
					$rootScope.session.userId = res.user_id;
					$rootScope.session.userName = res.true_name;
					$rootScope.session.role = res.role;
					$rootScope.session.complete = res.complete;
					$scope.saveSessionData();
					$location.path('/business');
				}, function (res) {
					alert(res.message);
				})
			}, function (res) {
				alert(res.message);
			})
		};
		
		$scope.onCheckPassword = function () {
			if ($scope.signupData.password !== $scope.signupData.passwordConfirm) {
				$scope.signupData.checkPassword = false;
			} else {
				$scope.signupData.checkPassword = true;
			}
		};
	}]);