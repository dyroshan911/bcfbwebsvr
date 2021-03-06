'use strict';

angular.module('myApp').controller('WechatWorksCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerData = {
			name: '',
			sex: 'male',
			phone: '',
		};
		
		$scope.wechatJsConfig();
		
		//functions
		$scope.onApply = function () {
			if ($scope.customerForm.$invalid) {
				return;
			}
			var dataObj = {
				name: $scope.customerData.name,
				sex: $scope.customerData.sex,
				phone: $scope.customerData.phone,		
			};
			$scope.myPromise = BusinessService.addJobApply($rootScope.session.token, dataObj, function (res) {
				//alert(JSON.stringify(res));
				alert('申请成功');
				wx.closeWindow();
			}, function (err) {
				alert(err.message);
			})
		}
	}]);