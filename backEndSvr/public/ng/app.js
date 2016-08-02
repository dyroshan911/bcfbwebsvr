/*
 * angular.js file
 */
'use strict';
var session_Storage = window.sessionStorage;

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngTouch', 'ngResource', 'cgBusy']);
myApp.config(['$routeProvider', '$locationProvider', '$resourceProvider',
	function ($routeProvider, $locationProvider, $resourceProvider) {
		$routeProvider.when('/', { redirectTo: '/login' });
		$routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl', permission: 'login' });
		$routeProvider.when('/home', { redirectTo: '/home/staff' });
		$routeProvider.when('/home/:params', { templateUrl: ('partial/home'), controller: 'HomeCtrl', permission: 'logged' });
		$routeProvider.when('/404', { templateUrl: ('partial/404'), permission: 'none' });
		$routeProvider.otherwise({ redirectTo: '/404' });
		
		$locationProvider.html5Mode(true);
		$resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
	}
]);

myApp.run(['$location', '$rootScope', 'SessionService', function ($location, $rootScope, SessionService) {
		$rootScope.session = {};
		$rootScope.saveSessionData = function () {
			if (session_Storage) {
				session_Storage.logged = $rootScope.session.logged;
			}
		};
		
		SessionService.initSession(function (data) {

		}, function (err) {
			
		});
		
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			var permission = next.$$route.permission;
			if (permission == 'login') {
				if (session_Storage.logged === 'true') {
					$location.path('/home');
				} else {
					return;
				}
			} else if (permission == 'logged') {
				if (session_Storage.logged === 'false') {
					$location.path('/login');
				}
				else {
					return;
				}
			} else {
				return;
			}
		});
		
		$rootScope.$on('$routeChangeSuccess', function (event, next, current) {
			if (session_Storage) {
				$rootScope.session.token = session_Storage.token;
				$rootScope.session.logged = session_Storage.logged === 'true' ? true : false;
			}
		});
	}]);
