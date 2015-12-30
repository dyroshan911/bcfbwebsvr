'use strict';

angular.module('myApp').controller('BusinessCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerList = [];
		$scope.MemberList = [];
		$scope.ChannelList = [];
		
		getCustomerList();
		if ($rootScope.session.role == '') {
			getMemberList(0, 10, '');
		}
		
		//functions
		function getCustomerList() {
			BusinessService.getBusiness($rootScope.session.token, function (res) {
				$rootScope.session;
				$scope.customerList = res.customerList;
				for (var i = 0; i < $scope.customerList.length; ++i) {
					$scope.customerList[i].createDate = (new Date($scope.customerList[i].create_on * 1000)).toLocaleString();
				}
			}, function (res) {
				alert(res.message);
			});
		}

		function getMemberList(Offset, Limit, filter) {
			var paramObj = {
				Offset: Offset,
				Limit: Limit,
				filter: filter
			};
			BusinessService.getMember($rootScope.session.token, paramObj, function (res) {
				$scope.MemberList = res.memberList;
			}, function (res) {
				alert(res.message);
			});
		}

		function getChannelList(Offset, Limit, filter) {
			var paramObj = {
				Offset: Offset,
				Limit: Limit,
				filter: filter
			};
			BusinessService.getChannel($rootScope.session.token, paramObj, function (res) {
				$scope.ChannelList = res.channelList;
			}, function (res) {
				alert(res.message);
			});
		}
	}]);