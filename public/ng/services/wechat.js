'use strict';

angular.module('myApp').factory('WechatService', ['ApiService', function (ApiService) {
		var cfgData = {};
		
		cfgData.auth = function (token, code, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: code
			};
			ApiService.post('api/sessions/wechatauth', obj, successcb, failcb);
		};
		
		return cfgData;
	}]);