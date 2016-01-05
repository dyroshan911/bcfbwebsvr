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
			BusinessService.addCustomer($rootScope.session.token, dataObj, function (res) {
				alert(JSON.stringify(res));
				if ($rootScope.session.wechatMode == true) {
					$location.path('/wechat-business');
				} else {
					$location.path('/business');
				}
			}, function (res) {
				alert(res.message);
			})
		}
	}]);