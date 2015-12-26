/*
 * angular.js file
 */
'use strict';
var sessionStorage = window.sessionStorage;

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngAnimate', 'ngTouch', 'cgBusy']);
myApp.config(['$routeProvider', '$locationProvider', '$resourceProvider',
	function ($routeProvider, $locationProvider, $resourceProvider) {
		$routeProvider.when('/', { redirectTo: '/home' });
		$routeProvider.when('/home', { templateUrl: ('partial/home'), controller: 'HomeCtrl' });
		$routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl' });
		$routeProvider.when('/signup', { templateUrl: ('partial/signup'), controller: 'SignupCtrl' });
		$routeProvider.when('/business', { templateUrl: ('partial/business'), controller: 'BusinessCtrl' });
		$routeProvider.when('/404', { templateUrl: ('partial/404'), controller: '' });
		$routeProvider.otherwise({ redirectTo: '/404' });
		$locationProvider.html5Mode(true);
		
		$resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
	}
]);

myApp.run(['$location', 'SessionService', function ($location, SessionService) {
		SessionService.initSession(function (data) {

		}, function (err) {

		});
	}]);
