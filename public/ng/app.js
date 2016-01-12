/*
 * angular.js file
 */
var sessionStorage = window.sessionStorage;

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngTouch', 'ngResource', 'cgBusy']);
myApp.config(['$routeProvider', '$locationProvider', '$resourceProvider',
	function ($routeProvider, $locationProvider, $resourceProvider) {
		$routeProvider.when('/', { redirectTo: '/home' });
		$routeProvider.when('/home', { templateUrl: ('partial/home'), controller: 'HomeCtrl' });
		$routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl' });
		$routeProvider.when('/wechat-signup', { templateUrl: ('partial/wechat-signup'), controller: 'WechatSignupCtrl' });
		$routeProvider.when('/signup', { templateUrl: ('partial/signup'), controller: 'SignupCtrl' });
		$routeProvider.when('/account', { templateUrl: ('partial/account'), controller: 'AccountCtrl' });
		$routeProvider.when('/business', { templateUrl: ('partial/business'), controller: 'BusinessCtrl' });
		$routeProvider.when('/wechat-business', { templateUrl: ('partial/wechat-business'), controller: 'BusinessCtrl' });
		$routeProvider.when('/apply', { templateUrl: ('partial/apply'), controller: 'ApplyCtrl' });
		$routeProvider.when('/wechat-bind', { templateUrl: ('partial/wechat-bind'), controller: 'BindCtrl' });
		$routeProvider.when('/wechat-warn', { templateUrl: ('partial/wechat-warn'), controller: 'WarnCtrl' });
		$routeProvider.when('/wechat-apply', { templateUrl: ('partial/wechat-apply'), controller: 'ApplyCtrl' });
		$routeProvider.when('/404', { templateUrl: ('partial/404'), controller: '' });
		$routeProvider.otherwise({ redirectTo: '/404' });
		$locationProvider.html5Mode(true);
		
		$resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
	}
]);

myApp.run(['$route', '$rootScope', '$location', 'SessionService', function ($route, $rootScope, $location, SessionService) {
		$rootScope.session = {};
		$rootScope.saveSessionData = function () {
			if (sessionStorage) {
				sessionStorage.logged = $rootScope.session.logged;
				sessionStorage.wechatMode = $rootScope.session.wechatMode;
				sessionStorage.userId = $rootScope.session.userId;
				sessionStorage.userName = $rootScope.session.userName;
				sessionStorage.role = $rootScope.session.role;
				sessionStorage.complete = $rootScope.session.complete;
			}
		};
		//$rootScope.session.wechatMode = sessionStorage.wechatMode = true;
		var firstStart = true;
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			if (firstStart) {
				event.preventDefault();
				SessionService.initSession(function (data) {
					var args = $location.search();
					if ((args.code && args.state) || args.openid) {
						$rootScope.session.wechatMode = sessionStorage.wechatMode = true;
						SessionService.wechatAuth(args, function (res) {
							firstStart = false;
							if ($location.path().indexOf('wechat-signup') != -1) {
								$location.path('/wechat-warn').search({ type: 'completed' });
								$location.replace();
							} else {
								$rootScope.session.logged = true;
								$rootScope.session.userId = res.user_id;
								$rootScope.session.userName = res.true_name;
								$rootScope.session.role = res.role;
								$rootScope.session.complete = res.complete;
								$rootScope.saveSessionData();
								$route.reload();
							}
						}, function (res) {
							firstStart = false;
							if ($location.path().indexOf('wechat-signup') != -1) {
								$route.reload();
							} else {
								$location.path('/wechat-warn').search({ type: 'need_singup' });
								$location.replace();
							}
						});
					} else {
						firstStart = false;
						$route.reload();
					}
				}, function () {
					alert('Initiate session failed');
				});
			}
		});
		
		$rootScope.$on('$routeChangeSuccess', function (event, next, current) {
			if (sessionStorage) {
				$rootScope.session.token = sessionStorage.token;
				$rootScope.session.logged = sessionStorage.logged === 'true' ? true : false;
				$rootScope.session.wechatMode = sessionStorage.wechatMode === 'true' ? true : false;
				$rootScope.session.userId = sessionStorage.userId;
				$rootScope.session.userName = sessionStorage.userName;
				$rootScope.session.role = sessionStorage.role;
				$rootScope.session.complete = sessionStorage.complete === 'true' ? true : false;;
			}
		});
	}]);