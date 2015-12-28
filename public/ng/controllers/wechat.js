'use strict';

angular.module('myApp').controller('WechatCtrl', ['$scope', '$location', '$rootScope', 'UserService', 
	function ($scope, $location, $rootScope, UserService) {
		$scope.wechatSignupData = {
			name: '',
			phone: '', 
			referrer: ''
		};
		
		//functions
		$scope.onWechatSignup = function () {

		};
	}]);