'use strict';

angular.module('myApp').factory('WebShowService', ['ApiService', function (ApiService) {
	var cfgData = {};

	cfgData.getProducts = function (token, dataObj, successcb, failcb) {
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.get('api/webShow/products', obj, successcb, failcb);
	};

	cfgData.getCases = function (token, dataObj, successcb, failcb) {
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.get('api/webShow/cases', obj, successcb, failcb);
	};

	return cfgData;
}]);