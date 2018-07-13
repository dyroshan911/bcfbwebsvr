'use strict';

angular.module('myApp').controller('WechatInsuranceCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {


		//jQuery
		$('#myTabs a[href="#myInsurance"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		})

		$('#myTabs a[href="#insuranceInfo"]').click(function (e) {
			e.preventDefault()
			$(this).tab('show');
		})
	}]);