'use strict';

angular.module('myApp').controller('AccountCtrl', ['$scope', '$location', '$rootScope', 'UserService',
	function ($scope, $location, $rootScope, UserService) {
		$scope.accountData = {
			userName: '',
			name: '',
			phone: '',
			password: '',
			passwordConfirm: '',
			checkPassword: true
		};
		
		$scope.completeData = {
			userName: '',
			password: '',
			passwordConfirm: '',
			checkPassword: true
		};
		
		getAccountInfo();
		
		//functions
		$scope.onSave = function () {
			if ($scope.accountForm.$invalid || !$scope.accountData.checkPassword) {
				return;
			}
			var dataObj = {
				true_name: $scope.accountData.name,
				phone: $scope.accountData.phone,
				password: $scope.accountData.passwordConfirm
			};
			UserService.updateAccountInfo($rootScope.session.token, dataObj, function (res) {
				//alert(JSON.stringify(res));
				if ($rootScope.session.wechatMode == true) {
					$location.path('/wechat-business');
				} else {
					$location.path('/business');
				}
			}, function (res) {
				alert(res.message);
			});
		};
		
		$scope.onCancel = function () {
			if ($rootScope.session.wechatMode == true) {
				$location.path('/wechat-business');
			} else {
				$location.path('/business');
			}
		};
		
		$scope.onCheckPassword = function (formData) {
			if (formData.password !== formData.passwordConfirm) {
				formData.checkPassword = false;
			} else {
				formData.checkPassword = true;
			}
		};
		
		$scope.onComplete = function () {
			if ($scope.completeForm.$invalid || !$scope.completeData.checkPassword) {
				return;
			}
			var dataObj = {
				user_name: $scope.completeData.userName,
				password: $scope.completeData.password
			};
			UserService.complete($rootScope.session.token, dataObj, function (res) {
				//alert(JSON.stringify(res));
				$rootScope.session.logged = true;
				$rootScope.session.userId = res.user_id;
				$rootScope.session.userName = res.true_name;
				$rootScope.session.role = res.role;
				$rootScope.session.complete = res.complete;
				$rootScope.saveSessionData();
				getAccountInfo();
				$('#completeDialog').modal('toggle');
			}, function (res) {
				alert(res.message);
			})
		};
		
		function getAccountInfo() {
			UserService.getAccountInfo($rootScope.session.token, function (res) {
				//alert(JSON.stringify(res));
				$scope.accountData.userName = res.user_name;
				$scope.accountData.name = res.true_name;
				$scope.accountData.phone = res.phone;
				if (res.complete == false) {
					$('#completeDialog').modal({ backdrop: false, keyboard: false });
				}
			}, function (res) {
				alert(res.message);
			});
		}
	}]);