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
			{ name: '渠道', value: 'channel' },
			{ name: '渠道总监', value: 'channel-mgr' }
		];
		$scope.statusList = [
			{ name: '启用', value: true },
			{ name: '禁用', value: false }
		]
		$scope.search = '';
		
		$scope.addUserData = {
			userName: '',
			name: '',
			phone: '',
			role: $scope.roleList[0],
			superior: {}
		};
		$scope.updateUserData = {
			selectedUser: {},
			userName: '',
			name: '',
			phone: '',
			role: $scope.roleList[0],
			superior: {},
			enable: {}   
		};
		
		getChannelList(0, $scope.eachPageCount, '');
		getChannelMgrList(0, $scope.eachPageCount, '');
		
		//functions
		$scope.gotoPage = function (pageData, index) {
			$scope.selectPage(pageData, index, getPageList);
		};
		
		$scope.onSearch = function () {
			getPageList($scope.pageData, '0');
		};
		
		$scope.onAddUser = function () {
			if ($scope.addForm.$invalid) {
				return;
			}
			var dataObj = {
				user_name: $scope.addUserData.userName,
				true_name: $scope.addUserData.name,
				phone: $scope.addUserData.phone,
				role: $scope.addUserData.role.value,
				superior: $scope.addUserData.superior.id
			};
			$scope.myPromiseAdd = ManageService.addChannel($rootScope.session.token, dataObj, function (res) {
				getChannelList(0, $scope.eachPageCount, '');
                getChannelMgrList(0, $scope.eachPageCount, '');
				$('#addDialog').modal('toggle');
			}, function (err) {
				alert(err.message);
			});
		};
		
		$scope.onEditUser = function (user) {
			$scope.updateUserData.selectedUser = user;
			$scope.updateUserData.userName = user.user_name;
			$scope.updateUserData.name = user.true_name;
			$scope.updateUserData.phone = user.phone;
			$scope.updateUserData.enable = $scope.statusList[0];
			for (var i = 0; i < $scope.roleList.length; ++i) {
				if (user.role == $scope.roleList[i].value) {
					$scope.updateUserData.role = $scope.roleList[i];
					break;
				}
			}
			for (var i = 0; i < $scope.channelMgrList.length; ++i) {
				if (user.superior == $scope.channelMgrList[i].id) {
					$scope.updateUserData.superior = $scope.channelMgrList[i];
					break;
				}
			}
			$('#editDialog').modal({ backdrop: false, keyboard: false });
		};
		
		$scope.onSave = function () {
			if ($scope.updateForm.$invalid) {
				return;
			}
			updateUser();
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
			}, function (err) {
				alert(err.message);
			});
		}
		
		function getChannelMgrList(offset, limit, filter) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			ManageService.getChannelMgr($rootScope.session.token, paramObj, function (res) {
				$scope.channelMgrList = res.channelsList;
			}, function (err) {
				alert(err.message);
			});
		}
		
		function updateUser() {
			var dataObj = {
				true_name: $scope.updateUserData.name,
				phone: $scope.updateUserData.phone,
				role: $scope.updateUserData.role.value,
				superior: $scope.updateUserData.superior.id,
				enable: $scope.updateUserData.enable.value
			};
			$scope.myPromiseEdit = ManageService.updateAccount($rootScope.session.token, $scope.updateUserData.selectedUser.id, dataObj, function (res) {
				$scope.updateUserData.selectedUser.true_name = $scope.updateUserData.name;
				$scope.updateUserData.selectedUser.phone = $scope.updateUserData.phone;
				$scope.updateUserData.selectedUser.role = $scope.updateUserData.role.value;
				$scope.updateUserData.selectedUser.roleName = $scope.updateUserData.role.name;
				$scope.updateUserData.selectedUser.superior = $scope.updateUserData.superior.id;
				$('#editDialog').modal('toggle');
			}, function (err) {
				alert(err.message);
			});
		};
		
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
        
        $scope.getChannelMgrNameById = function (id) {
            for(var i = 0; i < $scope.channelMgrList.length; ++i) {
                if (id == $scope.channelMgrList[i].id) {
                    return $scope.channelMgrList[i].true_name;
                }
            }
            return '';
        }
        
	}]);