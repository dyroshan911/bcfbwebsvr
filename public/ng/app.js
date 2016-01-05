/*
 * angular.js file
 */
var sessionStorage = window.sessionStorage;

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngAnimate', 'ngTouch', 'cgBusy']);
myApp.config(['$routeProvider', '$locationProvider', '$resourceProvider',
	function ($routeProvider, $locationProvider, $resourceProvider) {
		$routeProvider.when('/', { redirectTo: '/home' });
		$routeProvider.when('/home', { templateUrl: ('partial/home'), controller: 'HomeCtrl' });
		$routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl' });
		$routeProvider.when('/wechat-signup', { templateUrl: ('partial/wechat-signup'), controller: 'WechatCtrl' });
		$routeProvider.when('/signup', { templateUrl: ('partial/signup'), controller: 'SignupCtrl' });
		$routeProvider.when('/business', { templateUrl: ('partial/business'), controller: 'BusinessCtrl' });
		$routeProvider.when('/wechat-business', { templateUrl: ('partial/wechat-business'), controller: 'BusinessCtrl' });
		$routeProvider.when('/add-business', { templateUrl: ('partial/add-business'), controller: 'AddBusinessCtrl' });
		//$routeProvider.when('/members', { templateUrl: ('partial/members'), controller: 'MembersCtrl' });
		//$routeProvider.when('/wechat-members', { templateUrl: ('partial/wechat-members'), controller: 'MembersCtrl' });
		$routeProvider.when('/customers', { templateUrl: ('partial/customers'), controller: 'CustomersCtrl' });
		$routeProvider.when('/wechat-customers', { templateUrl: ('partial/wechat-customers'), controller: 'CustomersCtrl' });
		$routeProvider.when('/wechat-complete', { templateUrl: ('partial/wechat-complete'), controller: 'CompleteCtrl' });
		$routeProvider.when('/wechat-bind', { templateUrl: ('partial/wechat-bind'), controller: 'CompleteCtrl' });
		$routeProvider.when('/account', { templateUrl: ('partial/account'), controller: 'AccountCtrl' });
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
							alert(JSON.stringify(res));
							$rootScope.session.logged = true;
							$rootScope.session.userId = res.user_id;
							$rootScope.session.userName = res.true_name;
							$rootScope.session.role = res.role;
							$rootScope.session.complete = res.complete;
							$rootScope.saveSessionData();
							alert('登录成功');
							$location.path('/wechat-business');
						}, function (res) {
							alert(JSON.stringify(res));
							firstStart = false;
							$route.reload();
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