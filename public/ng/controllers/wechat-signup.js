'use strict';

angular.module('myApp').controller('WechatSignupCtrl', ['$scope', '$location', '$rootScope', 'UserService',
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
				true_name: $scope.wechatSignupData.name,
				email: '',
				superior: $scope.wechatSignupData.superior
			};
			$scope.myPromise = UserService.signup($rootScope.session.token, dataOdj, function (res) {
				//alert(JSON.stringify(res));
				$rootScope.session.logged = true;
				$rootScope.session.wechatMode = true;
				$rootScope.session.userId = res.user_id;
				$rootScope.session.userName = res.true_name;
				$rootScope.session.role = res.role;
				$rootScope.session.complete = res.complete;
				$rootScope.saveSessionData();
				$location.path('/wechat-business');
				$location.replace();
			}, function (err) {
				alert(err.message);
			})
		};
	}]);