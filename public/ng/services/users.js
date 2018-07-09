'use strict';

angular.module('myApp').factory('UserService', ['ApiService', function (ApiService) {
		var cfgData = {};
		
		cfgData.signup = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.post('api/accounts', obj, successcb, failcb);
		};
		
		cfgData.login = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.post('api/sessions/user', obj, successcb, failcb);
		};
		
		cfgData.complete = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.put('api/accounts/completeAcount', obj, successcb, failcb);
		};
		
		cfgData.bind = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.put('api/accounts', obj, successcb, failcb);
		};
		
		cfgData.getAccountInfo = function (token, successcb, failcb) {
			var obj = {
				params: {
					token: token
				}
			};
			return ApiService.get('api/accounts/accountInfo', obj, successcb, failcb);
		};
		
		cfgData.updateAccountInfo = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.put('api/accounts/accountInfo', obj, successcb, failcb);
		};
		
		cfgData.getJsConfigData = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.post('api/wechat/js_config', obj, function (data) {
				successcb(data);
			}, failcb);
		};
		
		return cfgData;
	}]);