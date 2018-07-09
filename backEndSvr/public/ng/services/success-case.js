'use strict';

angular.module('myApp').factory('SuccessCaseService', ['ApiService',
	function (ApiService) {
		var cfgData = {};
		
		cfgData.addSuccessCase = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: dataObj
			};
			return ApiService.post('api/cases', obj, successcb, failcb);
		};
		
		cfgData.updateSuccessCase = function (token, caseId, dataObj, successcb, failcb) {
			var url = 'api/cases/' + caseId;
            var obj = {
                params: {
                    token: token
                },
                data: dataObj
            };
            return ApiService.put(url, obj, successcb, failcb);
		};

		cfgData.getSuccessCases = function (token, paramObj, successcb, failcb) {
			var obj = {
				params: {
					token: token,
					offset: paramObj.offset,
					limit: paramObj.limit,
				}
			};
			return ApiService.get('api/cases', obj, successcb, failcb);
		};
		
		cfgData.removeSuccessCase = function (token, successCaseId, successcb, failcb) {
			var obj = {
				params: {
					token: token
				}
			};
			var url = 'api/cases/' + successCaseId;
			return ApiService.delete(url, obj, successcb, failcb);
		};
		
		return cfgData;
	}]);