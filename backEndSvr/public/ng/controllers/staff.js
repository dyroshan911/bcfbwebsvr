'use strict';

angular.module('myApp').controller('StaffCtrl', ['$scope', '$location', '$rootScope', 'ManageService',
	function ($scope, $location, $rootScope, ManageService) {
		$scope.channelList = [];
		$scope.channelMgrList = [];
		$scope.pageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.roleList = [
			{ name: '渠道总监', value: 'channel-mgr' },
			{ name: '渠道', value: 'channel' }
		];
		$scope.search = '';
		
		$scope.addUserData = {
			userName: '',
			phone: '',
			name: '',
			role: {},
			superior: {}
		};
		
		getChannelList(0, $scope.eachPageCount, '');
		
		//functions
		$scope.gotoPage = function (pageData, index) {
			$scope.selectPage(pageData, index, getPageList);
		};
		
		$scope.onSearch = function () {
			getPageList($scope.pageData, '0');
		};
		
		$scope.onAddUser = function () {

		};
		
		$scope.onUpdateUser = function () {

		};
		
		function getChannelList(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseStaff = ManageService.getChannels($rootScope.session.token, paramObj, function (res) {
				$scope.channelList = res.channelsList;
				for (var i = 0; i < $scope.channelList.length; ++i) {
					$scope.channelList[i].createDate = $scope.getDateString($scope.channelList[i].create_on * 1000);
					$scope.channelList[i].roleName = getRoleName($scope.channelList[i].role);
				}
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
			}, function (res) {
				alert(res.message);
			});
		}
		
		function getPageList(pageData, pageIndex) {
			getChannelList(parseInt(pageIndex) * $scope.eachPageCount, $scope.eachPageCount, $scope.search, pageIndex);
		}
		
		function getRoleName(role) {
			for (var i = 0; i < $scope.roleList.length; ++i) {
				if (role == $scope.roleList[i].value) {
					return $scope.roleList[i].name;
				}
			}
			return '';
		}
	}]);