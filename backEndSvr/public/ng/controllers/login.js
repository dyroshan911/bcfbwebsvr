'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myApp
 */
angular.module('myApp').controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'UserService',
	function ($scope, $location, $rootScope, UserService) {
		$scope.loginData = {
			userName: '',
			password: '',
			securityCode: ''
		};

		$scope.login = function () {
			
		};
	}]);