'use strict';

angular.module('myApp').controller('WechatApplyCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerData = {
			name: '',
			phone: '',
			amount: ''
		};
		
		$scope.wechatJsConfig();

		//functions
		$scope.onApply = function () {
			if ($scope.customerForm.$invalid) {
				return;
			}
			var dataObj = {
				name: $scope.customerData.name,
				phone: $scope.customerData.phone,		
				apply_amount: $scope.customerData.amount
			};
			$scope.myPromise = BusinessService.addCustomer($rootScope.session.token, dataObj, function (res) {
				//alert(JSON.stringify(res));
				alert('申请成功');
				wx.closeWindow();
			}, function (err) {
				alert(err.message);
			})
		}
	}]);