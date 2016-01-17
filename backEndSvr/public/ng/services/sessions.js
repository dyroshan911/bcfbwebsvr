'use strict';

angular.module('myApp').factory('SessionService', ['$rootScope', 'MsgService', 'ApiService', function ($rootScope, MsgService, ApiService) {
		var cfgData = {};
		
		cfgData.initSession = function (successcb, failcb) {
			$rootScope.session = {
				token: '',
				logged: false
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
			ApiService.post('/api/sessions', {}, function (data) {
				$rootScope.session.token = data.token;
				if (typeof (Storage) !== 'undefined') {
					sessionStorage.token = data.token;
				}
				successcb(data);
			}, failcb);
		};
		
		cfgData.deleteSessionUser = function (token, successcb, failcb) {
			var obj = {
				params : {
					token: token
				}
			};
			//whatever successful or not, clear session's user info
			ApiService.delete('/api/sessions/user', obj, function (data) {
				$rootScope.session.logged = false;
				successcb(data);
			}, function (err) {
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
			ApiService.head('/api/sessions', obj, successcb, failcb);
		};
		
		return cfgData;
	}]);