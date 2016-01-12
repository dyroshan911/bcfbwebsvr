/*
 * angular.js file
 */
'use strict';
var sessionStorage = window.sessionStorage;

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngTouch', 'ngResource', 'cgBusy']);
myApp.config(['$routeProvider', '$locationProvider', '$resourceProvider',
	function ($routeProvider, $locationProvider, $resourceProvider) {
		$routeProvider.when('/', { redirectTo: '/home' });
        $routeProvider.when('/home', {redirectTo: '/home/members' });
		$routeProvider.when('/home/:params', { templateUrl: ('partial/home'), controller: 'HomeCtrl' });
		$routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl' });
		$routeProvider.when('/404', { templateUrl: ('partial/404'), controller: '' });
		$routeProvider.otherwise({ redirectTo: '/404' });
		$locationProvider.html5Mode(true);
		
		$resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
	}
]);

myApp.run(['$location', 'SessionsService', function ($location, SessionsService) {
		return;
		SessionsService.initSession(function (data) {
			$location.path(path);
		}, function (err) {
			if (err.name == 'NeedSignIn') {
				$location.path('/login');
			} else {
				alert(err.message);
			}
		});
	}]);
