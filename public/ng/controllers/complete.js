'use strict';

angular.module('myApp').controller('CompleteCtrl', ['$scope', '$location', '$rootScope', 'UserService',
	function ($scope, $location, $rootScope, UserService) {
		$scope.accountData = {
			userName: '',
			password: ''
		};
		
		//functions
		$scope.onComplete = function () {
			var dataObj = {
				user_name: $scope.accountData.userName,
				password: $scope.accountData.password
			};
			UserService.complete($rootScope.session.token, dataObj, function (res) {
				alert(JSON.stringify(res));
				UserService.login($rootScope.session.token, dataObj, function (res) {
					alert(JSON.stringify(res));
					$rootScope.session.logged = true;
					$rootScope.session.userId = res.user_id;
					$rootScope.session.userName = res.true_name;
					$rootScope.session.role = res.role;
					$rootScope.session.complete = res.complete;
					$rootScope.saveSessionData();
					$location.path('/wechat-business');
				}, function () {
					alert(res.message);
				});
			}, function (res) {
				alert(res.message);
			})
		};
		
		$scope.onBind = function () {
			var dataObj = {
				user_name: $scope.accountData.userName,
				password: $scope.accountData.password
			};
			UserService.bind($rootScope.session.token, dataObj, function (res) {
				alert(JSON.stringify(res));
				UserService.login($rootScope.session.token, dataObj, function (res) {
					alert(JSON.stringify(res));
					$rootScope.session.logged = true;
					$rootScope.session.userId = res.user_id;
					$rootScope.session.userName = res.true_name;
					$rootScope.session.role = res.role;
					$rootScope.session.complete = res.complete;
					$rootScope.saveSessionData();
					$location.path('/wechat-business');
				}, function () {
					alert(res.message);
				});
			}, function (res) {
				alert(res.message);
			})
		};
	}]);