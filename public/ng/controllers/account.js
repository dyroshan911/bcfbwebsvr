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
		
		getAccountInfo();

		//functions
		$scope.onSave = function () {
			var dataObj = {
				true_name: $scope.accountData.name,
				phone: $scope.accountData.phone,
				password: $scope.accountData.passwordConfirm
			};
			UserService.updateAccountInfo($rootScope.session.token, dataObj, function (res) {
				alert(JSON.stringify(res));
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
		
		$scope.onCheckPassword = function () {
			if ($scope.accountData.password !== $scope.accountData.passwordConfirm) {
				$scope.accountData.checkPassword = false;
			} else {
				$scope.accountData.checkPassword = true;
			}
		};
		
		function getAccountInfo() {
			UserService.getAccountInfo($rootScope.session.token, function (res) {
				alert(JSON.stringify(res));
				$scope.accountData.userName = res.user_name;
				$scope.accountData.name = res.true_name;
				$scope.accountData.phone = res.phone;
			}, function (res) {
				alert(res.message);
			});
		}
	}]);