'use strict';

angular.module('myApp').controller('CustomersCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerList = [];
		var userId = $location.search().id;
		if (userId) {
			getCustomerListById(userId, 0, 10, '');
		}
		
		//functions
		function getCustomerListById(userId, offset, limit, filter) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			BusinessService.getCustomersById($rootScope.session.token, userId, function (res) {
				$scope.customerList = res.customerList;
				for (var i = 0; i < $scope.customerList.length; ++i) {
					$scope.customerList[i].createDate = $scope.getDateString($scope.customerList[i].create_on * 1000);
					$scope.customerList[i].showDetails = false;
				}
			}, function (res) {
				alert(res.message);
			});
		}
	}]);