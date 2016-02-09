'use strict';

angular.module('myApp').factory('StaffService', ['ApiService', function (ApiService) {
		var cfgData = {};
		
		cfgData.getChannels = function (token, paramObj, successcb, failcb) {
			var obj = {
				params: {
					token: token,
					offset: paramObj.offset,
					limit: paramObj.limit,
					filter: paramObj.filter
				}
			};
			return ApiService.get('api/accounts', obj, successcb, failcb);
		};
		
		cfgData.getChannelMgr = function (token, paramObj, successcb, failcb) {
			var obj = {
				params: {
					token: token,
					offset: paramObj.offset,
					limit: paramObj.limit,
					filter: paramObj.filter
				}
			};
			return ApiService.get('api/accounts/mgr', obj, successcb, failcb);
		};
		
		cfgData.addChannel = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.post('api/accounts', obj, successcb, failcb);
		};
		
		cfgData.updateAccount = function (token, userId, dataObj, successcb, failcb) {
			var url = 'api/accounts/' + userId;
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.put(url, obj, successcb, failcb);
		};
		
		return cfgData;
	}]);