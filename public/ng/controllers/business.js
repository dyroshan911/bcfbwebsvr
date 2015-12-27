'use strict';

angular.module('myApp').controller('BusinessCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerList = [];
		
		getCustomerList();

		//functions
		function getCustomerList() {
			BusinessService.getBusiness($rootScope.session.token, function (res) {
				res;
			}, function (res) {
				alert(res.message);
			});
		}
	}]);