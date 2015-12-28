'use strict';

angular.module('myApp').controller('WechatCtrl', ['$scope', '$location', '$rootScope', 'WechatService', 'UserService', 
	function ($scope, $location, $rootScope, WechatService, UserService) {
		$scope.wechatLoginData = {
			name: '',
			phone: '',
			referrer: ''
		};
		
		var urlCode = $location.search('code');
		alert(urlCode);
		wechatAuth();
		
		//functions
		$scope.onWechatLogin = function () {

		};
		
		function wechatAuth() {
			if (urlCode) {
				WechatService.auth($rootScope.session.token, urlCode, function (res) {
					JSON.stringify(res);
				}, function (res) {
					alert(res.message);
				})
			}
		}
	}]);