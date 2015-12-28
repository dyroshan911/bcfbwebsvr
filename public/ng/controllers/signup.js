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
				res;
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