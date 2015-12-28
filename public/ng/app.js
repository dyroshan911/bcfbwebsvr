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
		$routeProvider.when('/wechat_signup', { templateUrl: ('partial/wechat-signup'), controller: 'WechatCtrl' });
		$routeProvider.when('/signup', { templateUrl: ('partial/signup'), controller: 'SignupCtrl' });
		$routeProvider.when('/business', { templateUrl: ('partial/business'), controller: 'BusinessCtrl' });
		$routeProvider.when('/add-business', { templateUrl: ('partial/add-business'), controller: 'AddBusinessCtrl' });
		$routeProvider.when('/404', { templateUrl: ('partial/404'), controller: '' });
		$routeProvider.otherwise({ redirectTo: '/404' });
		$locationProvider.html5Mode(true);
		
		$resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
	}
]);

myApp.run(['$route', '$rootScope', '$location', 'SessionService', function ($route, $rootScope, $location, SessionService) {
		$rootScope.session = {};
		var firstStart = true;
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			if (firstStart) {
				event.preventDefault();
				SessionService.initSession(function (data) {
					var args = $location.search();
					if ((args.code && args.state) || args.openid) {
						SessionService.auth(args, function (res) {
							firstStart = false;
							alert(JSON.stringify(res));
							alert('登录成功');
							$location.path('/business');
						}, function (res) {
							alert(JSON.stringify(res));
							firstStart = false;
							$route.reload();
						});
					} else {
						firstStart = false;
						$route.reload();
					}
				}, function (res) {
					alert(res.message);
				});
			}
		});
	}]);
