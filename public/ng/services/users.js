'use strict';

angular.module('myApp').factory('UserService', ['ApiService', function (ApiService) {
		var cfgData = {};
		
		cfgData.signup = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: {
					user_name: dataObj.userName,
					password: dataObj.passwordConfirm,
					phone: dataObj.phone,
					true_name : dataObj.name,
					email : dataObj.email,
					superior: dataObj.superior
				}
			};
			ApiService.post('api/accounts', obj, successcb, failcb);
		};
		
		cfgData.login = function (token, dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: {
					user_name: dataObj.userName,
					password: dataObj.password
				}
			};
			ApiService.post('api/sessions/user', obj, successcb, failcb);
		};
		
		return cfgData;
	}]);