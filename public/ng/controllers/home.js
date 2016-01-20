'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$location', 
	function ($scope, $location) {
		$('.carousel').carousel({
			interval: 5000
		})
	}]);