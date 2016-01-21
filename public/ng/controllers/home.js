'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$location', 
	function ($scope, $location) {
		$('.carousel').carousel({
			interval: 5000
		})
		
		$scope.productList = [
			{ name: '信用贷款', edu: '1万 ~ 10万', lilv: '0.60 ~ 1.73%', content: '审核快速，申请简单' },
			{ name: '企业贷款', edu: '100万 ~ 1000万', lilv: '0.70 ~ 1.90%', content: '额度高，期限长' },
			{ name: '房产抵押贷款', edu: '20万 ~ 150万', lilv: '0.56 ~ 1.55%', content: '利率低，放款快' },
			{ name: '汽车抵押贷款', edu: '3万 ~ 50万', lilv: '0.60 ~ 1.84%', content: '只需有车即可办理' }
		];
	}]);