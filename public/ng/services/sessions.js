'use strict';

angular.module('myApp').factory('SessionService', ['$rootScope', 'MsgService', 'ApiService', function ($rootScope, MsgService, ApiService) {
		var cfgData = {};
		
		cfgData.initSession = function (successcb, failcb) {
			$rootScope.session = {
				token: '',
				logged: false,
				wechatMode: false
			};
			
			if (typeof (Storage) !== 'undefined') {
				// Yes! localStorage and sessionStorage support!
				//is page session already has a token?
				if (sessionStorage.token) {
					//Yes!
					$rootScope.session.token = sessionStorage.token;
					//is token valid?
					cfgData.verifyToken($rootScope.session.token, function (res) {
						//yes! 
						successcb(null);
					}, function (err) {
						//No
						//token should be generated again
						$rootScope.session.token = sessionStorage.token = '';
						cfgData.createSession(function (res) {
							//successfully generated
							successcb(null);
						}, failcb);
					});
				} else {
					// token not found in sessionStorage, create one
					cfgData.createSession(function (res) {
						//successfully generated
						successcb(null);
					}, failcb);
				}
			} else {
				// Sorry! No web storage support..
				// token only save in $rootScope, create one
				cfgData.createSession(function (res) {
					//successfully generated
					successcb(null);
				}, failcb);
			}
		};
		
		cfgData.createSession = function (successcb, failcb) {
			ApiService.post('api/sessions', {}, function (res) {
				$rootScope.session.token = res.token;
				if (typeof (Storage) !== 'undefined') {
					sessionStorage.token = res.token;
					sessionStorage.logged = false;
					sessionStorage.wechatMode = false;
				}
				successcb(res);
			}, failcb);
		};
		
		cfgData.getSessionUser = function (token, successcb, failcb) {
			var obj = {
				params : {
					token: token
				}
			};
			ApiService.get('api/sessions/user', obj, successcb, failcb);
		};
		
		cfgData.deleteSessionUser = function (token, successcb, failcb) {
			var obj = {
				params : {
					token: token
				}
			};
			//whatever successful or not, clear session's user info
			ApiService.delete('api/sessions/user', obj, function (res) {
				clearSession();
				successcb(res);
			}, function (err) {
				clearSession();
				failcb(err);
			});
		};
		
		cfgData.verifyToken = function (token, successcb, failcb) {
			var obj = {
				params : {
					token: token
				}
			};
			ApiService.head('api/sessions', obj, successcb, failcb);
		};
		
		cfgData.wechatAuth = function (dataObj, successcb, failcb) {
			var obj = {
				params: {
					token: $rootScope.session.token
				},
				data: dataObj
			};
			ApiService.post('api/sessions/wechatauth', obj, successcb, failcb);
		};
		
		function clearSession() {
			delete $rootScope.session.userId;
			delete $rootScope.session.userName;
			delete $rootScope.session.role;
			$rootScope.session.logged = false;
			$rootScope.session.wechatMode = false;
			
			delete sessionStorage.userId;
			delete sessionStorage.userName;
			delete sessionStorage.role;
			sessionStorage.logged = false;
			sessionStorage.wechatMode = false;
		}
		
		return cfgData;
	}]);