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
		
		return cfgData;
	}]);