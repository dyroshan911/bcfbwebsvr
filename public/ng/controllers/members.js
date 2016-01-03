'use strict';

angular.module('myApp').controller('MembersCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.memberList = [];
		var userId = $location.search().id;
		if (userId) {
			getMemberListById(userId, 0, 10, '');
		}
		
		//functions
		function getMemberListById(userId, offset, limit, filter) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			BusinessService.getMembersById($rootScope.session.token, userId, paramObj, function (res) {
				$scope.memberList = res.memberList;
				for (var i = 0; i < $scope.memberList.length; ++i) {
					$scope.memberList[i].createDate = (new Date($scope.memberList[i].create_on * 1000)).toLocaleString();
					$scope.memberList[i].showDetails = false;
				}
			}, function (res) {
				alert(res.message);
			});
		}
	}]);