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
		
		$scope.onSignup = function () {
			UserService.signup($rootScope.session.token, $scope.signupData, function (res) {
				res;
			}, function (res) {
				alert(res.message);
			})
		};
	}]);