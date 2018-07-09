'use strict';

angular.module('myApp').controller('ProductCtrl', ['$scope', '$location', '$rootScope', 'WebShowService',
	function ($scope, $location, $rootScope, WebShowService) {
		$scope.productList = [];

		getProducts(0, '', '');

		//functions
		function getProducts(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			WebShowService.getProducts($rootScope.session.token, paramObj, function (res) {
				$scope.productList = res.productsList;
				for (var i = 0; i < $scope.productList.length; ++i) {
					$scope.productList[i].amount = $scope.productList[i].money_min + ' ~ ' + $scope.productList[i].money_max + ' 万';
					$scope.productList[i].rate = $scope.productList[i].rate_min + '% ~ ' + $scope.productList[i].rate_max + '%';
				}
			}, function (err) {
				//alert(err.message);
			});
		}
	}]);