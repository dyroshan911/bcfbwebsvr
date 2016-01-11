'use strict';

angular.module('myApp').controller('WechatCtrl', ['$scope', '$location', '$rootScope', 'UserService', 
	function ($scope, $location, $rootScope, UserService) {
		$scope.wechatSignupData = {
			name: '',
			phone: '', 
			superior: ''
		};
		
		//functions
		$scope.onWechatSignup = function () {
			if ($scope.wechatSignupForm.$invalid) {
				return;
			}
			var dataOdj = {
				user_name: '',
				password: '',
				phone: $scope.wechatSignupData.phone,
				true_name : $scope.wechatSignupData.name,
				email : '',
				superior: $scope.wechatSignupData.superior
			};
			UserService.signup($rootScope.session.token, dataOdj, function (res) {
				//alert(JSON.stringify(res));
				if ($rootScope.session.wechatMode == true) {
					$location.path('/wechat-business');
				} else {
					$location.path('/business');
				}
			}, function (res) {
				alert(res.message);
			})
		};
	}]);