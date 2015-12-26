'use strict';

angular.module('myApp').factory('SessionService', ['$rootScope', 'MsgService', 'ApiService', function ($rootScope, MsgService, ApiService) {
		var cfgData = {};
		
		cfgData.createSession = function (successcb, failcb) {
			ApiService.post('api/sessions', {}, function (res) {
				$rootScope.session.token = res.token;
				if (typeof (Storage) !== 'undefined') {
					sessionStorage.token = res.token;
				}
				successcb(res);
			}, failcb);
		};
		
		cfgData.initSession = function (successcb, failcb) {
			$rootScope.session = {
				logged: false,
				token: ''
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
						//And is user has logged?
						successcb();
						return;
						cfgData.getSessionUser($rootScope.session.token, function (res) {
							//yes! so reserve user basic info in $rootScope
							$rootScope.session.logged = true;
							$rootScope.session.userId = res.user_id;
							$rootScope.session.userName = res.user_name;
							$rootScope.session.role = res.role;
							successcb(res);
						}, function (err) {
							//No
							//that's OK, user need login
							failcb(MsgService.getMsg('m11001'));
						});
					}, function (err) {
						//No
						//token should be generated again
						sessionStorage.token = $rootScope.session.token = '';
						cfgData.createSession(function (res) {
							//successfully generated, but need login
							failcb(MsgService.getMsg('m11001'));
						}, failcb);
					});
				} else {
					// token not found in sessionStorage, create one
					cfgData.createSession(function (res) {
						//successfully generated, but need login
						failcb(MsgService.getMsg('m11001'));
					}, failcb);
				}
			} else {
				// Sorry! No web storage support..
				// token only save in $rootScope, create one
				cfgData.createSession(function (res) {
					//successfully generated, but need login
					failcb(MsgService.getMsg('m11001'));
				}, failcb);
			}
		};
		
		cfgData.getSessionUser = function (token, successcb, failcb) {
			var obj = {
				params : {
					token: token
				}
			};
			ApiService.get('api/sessions/user', obj, successcb, failcb);
		};
		
		cfgData.createSessionUser = function (token, userName, password, securityCode, successcb, failcb) {
			var obj = {
				params: {
					token: token
				},
				data: {
					user_name: userName,
					password: password,
					security_code: securityCode
				}
			};
			ApiService.post('api/sessions/user', obj, function (res) {
				$rootScope.session.logged = true;
				$rootScope.session.userId = res.user_id;
				$rootScope.session.userName = res.user_name;
				$rootScope.session.role = res.role;
				successcb(res);
			}, failcb);
		};
		
		cfgData.deleteSessionUser = function (token, successcb, failcb) {
			var obj = {
				params : {
					token: token
				}
			};
			//whatever successful or not, clear session's user info
			ApiService.delete('api/sessions/user', obj, function (res) {
				delete $rootScope.session.userId;
				delete $rootScope.session.userName;
				delete $rootScope.session.role;
				$rootScope.session.logged = false;
				successcb(res);
			}, function (err) {
				delete $rootScope.session.userId;
				delete $rootScope.session.userName;
				delete $rootScope.session.role;
				$rootScope.session.logged = false;
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
		
		return cfgData;
	}]);