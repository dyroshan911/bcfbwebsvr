'use strict';

angular.module('myApp').controller('ProductCtrl', ['$scope', '$location', '$rootScope', 'ProductService',
	function ($scope, $location, $rootScope, ProductService) {
		$scope.productList = [];
		$scope.pageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.search = '';
		
		$scope.addProductData = {
			title: '',
			type: '',
			moneyMin: '',
			moneyMax: '',
			rateMin: '',
			rateMax: '',
			detail: ''
		};
		$scope.updateProductData = {
			selectedProduct: {},
			title: '',
			type: '',
			moneyMin: '',
			moneyMax: '',
			rateMin: '',
			rateMax: '',
			detail: ''
		};
		
		getProductList(0, $scope.eachPageCount, '');
		
		//functions
		$scope.gotoPage = function (pageData, index) {
			$scope.selectPage(pageData, index, getPageList);
		};
		
		$scope.onSearch = function () {
			getPageList($scope.pageData, '0');
		};
		
		$scope.onAddProduct = function () {
			if ($scope.addForm.$invalid) {
				return;
			}
			var dataObj = {
				title: $scope.addProductData.title,
				type: $scope.addProductData.type,
				money_min: $scope.makeFloat(parseFloat($scope.addProductData.moneyMin)),
				money_max: $scope.makeFloat(parseFloat($scope.addProductData.moneyMax)),
				rate_min: $scope.makeFloat(parseFloat($scope.addProductData.rateMin)),
				rate_max: $scope.makeFloat(parseFloat($scope.addProductData.rateMax)),
				detail: $scope.addProductData.detail,
			};
			$scope.myPromiseAdd = ProductService.addProduct($rootScope.session.token, dataObj, function (res) {
				getProductList(0, $scope.eachPageCount, '');
				alert('新增产品成功');
				$('#addDialog').modal('toggle');
			}, function (err) {
				alert(err.message);
			});
		};
		
		$scope.onEditProduct = function (product) {
			$scope.updateProductData.selectedProduct = product;
			$scope.updateProductData.title = product.title;
			$scope.updateProductData.type = product.type;
			$scope.updateProductData.moneyMin = product.money_min;
			$scope.updateProductData.moneyMax = product.money_max;
			$scope.updateProductData.rateMin = product.rate_min;
			$scope.updateProductData.rateMax = product.rate_max;
			$scope.updateProductData.detail = product.detail;
			$('#editDialog').modal({ backdrop: false, keyboard: false });
		};
		
		$scope.onSave = function () {
			if ($scope.updateForm.$invalid) {
				return;
			}
			var dataObj = {
				title: $scope.updateProductData.title,
				type: $scope.updateProductData.type,
				money_min: $scope.makeFloat(parseFloat($scope.updateProductData.moneyMin)),
				money_max: $scope.makeFloat(parseFloat($scope.updateProductData.moneyMax)),
				rate_min: $scope.makeFloat(parseFloat($scope.updateProductData.rateMin)),
				rate_max: $scope.makeFloat(parseFloat($scope.updateProductData.rateMax)),
				detail: $scope.updateProductData.detail,
			};
			$scope.myPromiseEdit = ProductService.updateProduct($rootScope.session.token, $scope.updateProductData.selectedProduct.id, dataObj, function (res) {
				$scope.updateProductData.selectedProduct.title = $scope.updateProductData.title;
				$scope.updateProductData.selectedProduct.type = $scope.updateProductData.type;
				$scope.updateProductData.selectedProduct.money_min = $scope.updateProductData.money_min;
				$scope.updateProductData.selectedProduct.money_max = $scope.updateProductData.money_max;
				$scope.updateProductData.selectedProduct.rate_min = $scope.updateProductData.rate_min;
				$scope.updateProductData.selectedProduct.rate_max = $scope.updateProductData.rate_max;
				$scope.updateProductData.selectedProduct.detail = $scope.updateProductData.detail;
				$('#editDialog').modal('toggle');
			}, function (err) {
				alert(err.message);
			});
		};
		
		$scope.onRemoveProduct = function (index, product) {
			var msg = '确定将 “' + product.title + '” 从产品列表中移除吗？';
			var answer = window.confirm(msg);
			if (answer === true) {
				$scope.myPromiseProduct = ProductService.removeProduct($rootScope.session.token, product.id, function (res) {
					alert('删除成功');
					$scope.productList.splice(index, 1);
				}, function (err) {
					alert(err.message);
				});
			} else {
				return;
			}
		}
		
		function getProductList(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseProduct = ProductService.getProducts($rootScope.session.token, paramObj, function (res) {
				$scope.productList = res.productsList;
				var total = res.total;
				if (total >= 0) {
					$scope.pageData.total = parseInt(total / $scope.eachPageCount);
					if ((total % $scope.eachPageCount) != 0) {
						$scope.pageData.total++;
					}
					currentPageIndex = currentPageIndex || '0';
					$scope.sortPages($scope.pageData, currentPageIndex);
					$scope.setCurrentPage($scope.pageData, currentPageIndex);
				}
			}, function (err) {
				alert(err.message);
			});
		}

		function getPageList(pageData, pageIndex) {
			getProductList(parseInt(pageIndex) * $scope.eachPageCount, $scope.eachPageCount, $scope.search, pageIndex);
		}
	}]);