'use strict';

angular.module('myApp').controller('AddBusinessCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerData = {
			name: '',
			phone: '',
			amount: ''
		};
		
		//functions
		$scope.onAddBusiness = function () {
			if ($scope.customerForm.$invalid) {
				return;
			}
			var dataObj = {
				name: $scope.customerData.name,
				phone: $scope.customerData.phone,		
				apply_amount: $scope.customerData.amount
			};
			BusinessService.addBusiness($rootScope.session.token, dataObj, function (res) {
				$location.path('/business');
			}, function (res) {
				alert(res.message);
			})
		}
	}]);