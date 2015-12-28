'use strict';

angular.module('myApp').controller('WechatCtrl', ['$scope', '$location', '$rootScope', 'WechatService', 'UserService', 
	function ($scope, $location, $rootScope, WechatService, UserService) {
		$scope.wechatSignupData = {
			name: '',
			phone: '', 
			referrer: ''
		};
		
		//functions
		$scope.onWechatSignup = function () {

		};
	}]);