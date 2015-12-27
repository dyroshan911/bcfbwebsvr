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
			superior: ''
		};
		
		//functions
		$scope.onSignup = function () {
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
	}]);