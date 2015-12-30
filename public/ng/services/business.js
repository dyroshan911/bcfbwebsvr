'use strict';

angular.module('myApp').factory('BusinessService', ['ApiService', function (ApiService) {
		var cfgData = {};
		
		cfgData.addBusiness = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			ApiService.post('api/customers', obj, successcb, failcb);
		};
		
		cfgData.getBusiness = function (token, successcb, failcb) {
			var obj = {
				params: {
					token: token
				}
			};
			ApiService.get('api/customers', obj, successcb, failcb);
		};
		
		cfgData.getBusinessById = function (token, userId, successcb, failcb) {
			var url = 'api/customers/' + userId;
			var obj = {
				params: {
					token: token
				}
			};
			ApiService.get(url, obj, successcb, failcb);
		};
		
		cfgData.getMember = function (token, paramObj, successcb, failcb) {
			var obj = {
				params: {
					token: token,
					Offset: paramObj.offset,
 					Limit: paramObj.limit,
					filter: paramObj.filter
				}
			};
			ApiService.get('api/accounts/member', obj, successcb, failcb);
		};
		
		cfgData.getMemberById = function (token, paramObj, userId, successcb, failcb) {
			var url = 'api/accounts/member' + userId;
			var obj = {
				params: {
					token: token,
					Offset: paramObj.offset,
					Limit: paramObj.limit,
					filter: paramObj.filter
				}
			};
			ApiService.get(url, obj, successcb, failcb);
		};
		
		cfgData.getChannel = function (token, paramObj, successcb, failcb) {
			var obj = {
				params: {
					token: token,
					Offset: paramObj.offset,
					Limit: paramObj.limit,
					filter: paramObj.filter
				}
			};
			ApiService.get('api/accounts/channel', obj, successcb, failcb);
		};
		
		return cfgData;
	}]);