'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$location', '$rootScope', 'WebShowService', 'BusinessService',
	function ($scope, $location, $rootScope, WebShowService, BusinessService) {
		$('.carousel').carousel({
			interval: 5000
		})

		$scope.staffList = [];
		$scope.productList = [];
		$scope.caseList = [];
		$scope.infoList = [];

		$scope.customerData = {
			name: '',
			sex: 'male',
			phone: '',
			amount: ''
		};

		$scope.applyData = {
			name: '',
			sex: 'male',
			phone: '',
			amount: ''
		};

		getProducts(0, '', '');
		getCases(0, '', '');

		//functions
		$scope.onApply = function () {
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

		$scope.onApply_ = function () {
			var dataObj = {
				name: $scope.applyData.name,
				sex: $scope.applyData.sex,
				phone: $scope.applyData.phone,
				apply_amount: $scope.applyData.amount
			};
			$scope.myPromise = BusinessService.addCustomer($rootScope.session.token, dataObj, function (res) {
				//alert(JSON.stringify(res));
				alert('申请成功');
			}, function (err) {
				alert(err.message);
			})
		}

		$scope.staffList = [
			{ name: '高经理', phone: '13699469616', business: '信用贷款，抵押贷款，企业贷款', content: '4年' },
			{ name: '何经理', phone: '13018290880', business: '房产抵押贷款，汽车抵押贷款', content: '3年' },
			{ name: '张经理', phone: '18782000388', business: '银行类信用、抵押、企业贷款', content: '4年' }
		];

		$scope.infoList = [
			{ title: '中国农业银行首推农民群体专属个人房贷产品', link: '/information?index=001' },
			{ title: '提醒：定期查询个人信用报告 避免背“黑锅”', link: '/information?index=002' },
			{ title: '2.5万亿贷款投向何处？政府加速加杠杆', link: '/information?index=003' },
			{ title: '央行等八部委：落实差别化工业信贷政策', link: '/information?index=004' },
			{ title: '成都高新区双创突围：5年建成万亿级国际创新创业中心', link: '/information?index=005' }
		];

		function getProducts(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			WebShowService.getProducts($rootScope.session.token, paramObj, function (res) {
				$scope.productList = res.productsList;
				$scope.productList = $scope.productList.slice(0, 4);
				for (var i = 0; i < $scope.productList.length; ++i) {
					$scope.productList[i].amount = $scope.productList[i].money_min + ' ~ ' + $scope.productList[i].money_max + ' 万';
					$scope.productList[i].rate = $scope.productList[i].rate_min + '% ~ ' + $scope.productList[i].rate_max + '%';
				}
			}, function (err) {
				//alert(err.message);
			});
		}

		function getCases(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			WebShowService.getCases($rootScope.session.token, paramObj, function (res) {
				$scope.casesList = res.casesList;
				for (var i = 0; i < $scope.casesList.length; ++i) {
					$scope.casesList[i].type = $scope.casesList[i].type;
					$scope.casesList[i].amount = $scope.casesList[i].amount + '万';
					$scope.casesList[i].rate = $scope.casesList[i].rate + '%' + ' (' + $scope.casesList[i].time_limit + '期)';
				}
			}, function (err) {
				//alert(err.message);
			});
		}
	}]);