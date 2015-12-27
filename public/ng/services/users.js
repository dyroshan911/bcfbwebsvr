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
			ApiService.post('api/accounts', obj, successcb, failcb);
		};
		
		cfgData.login = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			ApiService.post('api/sessions/user', obj, successcb, failcb);
		};
		
		return cfgData;
	}]);