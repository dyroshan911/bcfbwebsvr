'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$location', 'WebShowService', 'BusinessService',
	function ($scope, $location, WebShowService, BusinessService) {
		$('.carousel').carousel({
			interval: 5000
		})
		
		$scope.customerData = {
			name: '',
			sex: 'male',
			phone: '',
			amount: ''
		};
		
		//functions
		$scope.onApply = function () {
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
				alert('申请成功');
			}, function (err) {
				alert(err.message);
			})
		}
		
		$scope.staffList = [
			{ name: '员工A', phone: '15828540001', business: '信用贷款，企业贷款', content: '资深员工，放款快捷' },
			{ name: '员工B', phone: '15828540002', business: '房产抵押贷款', content: '资深员工，放款快捷' },
			{ name: '员工C', phone: '15828540003', business: '房产抵押贷款，汽车抵押贷款', content: '资深员工，放款快捷' }
		];
		
		$scope.productList = [
			{ name: '信用贷款', edu: '1万 ~ 10万', lilv: '0.60 ~ 1.73%', content: '审核快速，申请简单' },
			{ name: '企业贷款', edu: '100万 ~ 1000万', lilv: '0.70 ~ 1.90%', content: '额度高，期限长' },
			{ name: '房产抵押贷款', edu: '20万 ~ 150万', lilv: '0.56 ~ 1.55%', content: '利率低，放款快' },
			{ name: '汽车抵押贷款', edu: '3万 ~ 50万', lilv: '0.60 ~ 1.84%', content: '只需有车即可办理' }
		];
		
		$scope.caseList = [
			{ name: '王先生', type: '信用贷款', amount: '8万', lilv: '0.60%' },
			{ name: '赵先生', type: '企业贷款', amount: '100万', lilv: '0.70%' },
			{ name: '吴女士', type: '房产抵押贷款', amount: '20万', lilv: '0.65%' },
			{ name: '李先生', type: '汽车抵押贷款', amount: '3万', lilv: '1.84%' },
			{ name: '张先生', type: '信用贷款', amount: '5万', lilv: '0.62%' }
		];
		
		$scope.infoList = [
			{ title: '百城官方网站上线', date: '2016-01-20' },
			{ title: '百城微信公众号上线', date: '2016-01-20' },
			{ title: '百城会员开放注册', date: '2016-01-10' },
			{ title: '百城新业务启动', date: '2015-21-20' }
		];
		
		function getProducts(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			WebShowService.getProducts($rootScope.session.token, paramObj, function (res) {

			}, function (err) {

			});
		}
		
		function getCases(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			WebShowService.getCases($rootScope.session.token, paramObj, function (res) {

			}, function (err) {

			});
		}
	}]);