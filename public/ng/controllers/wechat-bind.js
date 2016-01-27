'use strict';

angular.module('myApp').controller('WechatBindCtrl', ['$scope', '$location', '$rootScope', 'UserService',
	function ($scope, $location, $rootScope, UserService) {
		$scope.bindData = {
			userName: '',
			password: ''
		};
		
		//functions	
		$scope.onBind = function () {
			var dataObj = {
				user_name: $scope.bindData.userName,
				password: $scope.bindData.password
			};
			$scope.myPromise = UserService.bind($rootScope.session.token, dataObj, function (res) {
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