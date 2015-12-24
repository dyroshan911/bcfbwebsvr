'use strict';

angular.module('myApp').factory('UserService', ['ApiService', function (ApiService) {
		var cfgData = {};
		
		cfgData.signup = function (token, signupData, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: {
					user_name: signupData.userName,
					password: signupData.passwordConfirm,
					phone: signupData.phone,
					true_name : signupData.name,
					email : signupData.email,
					superior: signupData.superior
				}
			};
			ApiService.post('api/accounts', obj, successcb, failcb);
		};
		
		cfgData.login = function (token, loginData, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: {
					user_name: loginData.userName,
					password: signupData.password
				}
			};
			ApiService.post('api/sessions/user', obj, successcb, failcb);
		};
		
		return cfgData;
	}]);