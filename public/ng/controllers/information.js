'use strict';

angular.module('myApp').controller('InformationCtrl', ['$scope', '$location', '$rootScope',
	function ($scope, $location, $rootScope) {
		var index = $location.search().index;
		$scope.page = '/information/' + index + '.ejs';
	}]);