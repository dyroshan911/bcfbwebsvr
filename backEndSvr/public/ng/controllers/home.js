'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$location', '$routeParams',
	function ($scope, $location,$routeParams) {
        $scope.currentPage = $routeParams.params;
	}]);