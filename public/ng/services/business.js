'use strict';

angular.module('myApp').factory('BusinessService', ['ApiService', function (ApiService) {
	var cfgData = {};

	cfgData.addCustomer = function (token, dataObj, successcb, failcb) {
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.post('api/customers', obj, successcb, failcb);
	};

	cfgData.addJobApply = function (token, dataObj, successcb, failcb) {
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.post('api/customers/works', obj, successcb, failcb);
	};

	cfgData.addInsuranceApply = function (token, dataObj, successcb, failcb) {
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.post('api/customers/insurance', obj, successcb, failcb);
	};

	cfgData.updateCustomer = function (token, userId, dataObj, successcb, failcb) {
		var url = 'api/customers/' + userId;
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.put(url, obj, successcb, failcb);
	};

	cfgData.getCustomers = function (token, paramObj, successcb, failcb) {
		var obj = {
			params: {
				token: token,
				offset: paramObj.offset,
				limit: paramObj.limit,
				filter: paramObj.filter
			}
		};
		return ApiService.get('api/customers', obj, successcb, failcb);
	};

	cfgData.getCustomersById = function (token, userId, paramObj, successcb, failcb) {
		var url = 'api/customers/' + userId;
		var obj = {
			params: {
				token: token,
				offset: paramObj.offset,
				limit: paramObj.limit,
				filter: paramObj.filter
			}
		};
		return ApiService.get(url, obj, successcb, failcb);
	};

	cfgData.getChannels = function (token, paramObj, successcb, failcb) {
		var obj = {
			params: {
				token: token,
				offset: paramObj.offset,
				limit: paramObj.limit,
				filter: paramObj.filter
			}
		};
		return ApiService.get('api/accounts/channel', obj, successcb, failcb);
	};

	cfgData.getMembers = function (token, paramObj, successcb, failcb) {
		var obj = {
			params: {
				token: token,
				offset: paramObj.offset,
				limit: paramObj.limit,
				filter: paramObj.filter
			}
		};
		return ApiService.get('api/accounts/member', obj, successcb, failcb);
	};

	cfgData.getMembersById = function (token, userId, paramObj, successcb, failcb) {
		var url = 'api/accounts/member/' + userId;
		var obj = {
			params: {
				token: token,
				offset: paramObj.offset,
				limit: paramObj.limit,
				filter: paramObj.filter
			}
		};
		return ApiService.get(url, obj, successcb, failcb);
	};

	cfgData.updateMemberById = function (token, userId, dataObj, successcb, failcb) {
		var url = 'api/accounts/' + userId;
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.put(url, obj, successcb, failcb);
	};

	cfgData.getPolicys = function (token, successcb, failcb) {
		var url = 'api/policys';
		var obj = {
			params: {
				token: token
			}
		};
		return ApiService.get(url, obj, successcb, failcb);
	};

	cfgData.getPolicysById = function (token, userId, paramObj, successcb, failcb) {
		var url = 'api/policys/' + userId;
		var obj = {
			params: {
				token: token,
				offset: paramObj.offset,
				limit: paramObj.limit,
				filter: paramObj.filter
			}
		};
		return ApiService.get(url, obj, successcb, failcb);
	};

	cfgData.addPolicy = function (token, dataObj, successcb, failcb) {
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.post('api/policys', obj, successcb, failcb);
	};

	cfgData.editPolicy = function (token, policyId, dataObj, successcb, failcb) {
		var url = 'api/policys/' + policyId;
		var obj = {
			params: {
				token: token
			},
			data: dataObj
		};
		return ApiService.put(url, obj, successcb, failcb);
	};

	cfgData.deletePolicy = function (token, policyId, successcb, failcb) {
		var url = 'api/policys/' + policyId;
		var obj = {
			params: {
				token: token
			}
		};
		return ApiService.delete(url, obj, successcb, failcb);
	};

	cfgData.getPolicyAnalysis = function (token, successcb, failcb) {
		var obj = {
			params: {
				token: token
			}
		};
		return ApiService.get('api/policys/analysis', obj, successcb, failcb);
	};

	return cfgData;
}]);
