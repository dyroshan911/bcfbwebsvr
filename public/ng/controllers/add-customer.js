'use strict';

angular.module('myApp').controller('AddCustomerCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerData = {
			name: '',
			sex: 'male',
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
				sex: $scope.customerData.sex,
				phone: $scope.customerData.phone,		
				apply_amount: $scope.customerData.amount
			};
			$scope.myPromise = BusinessService.addCustomer($rootScope.session.token, dataObj, function (res) {
				//alert(JSON.stringify(res));
				if ($rootScope.session.wechatMode == true) {
					$location.path('/wechat-business');
				} else {
					$location.path('/business');
				}
			}, function (err) {
				alert(err.message);
			})
		}

		$scope.onCancel = function () {
			if ($rootScope.session.wechatMode == true) {
					$location.path('/wechat-business');
				} else {
					$location.path('/business');
				}
		}
	}]);