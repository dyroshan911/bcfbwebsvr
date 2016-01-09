'use strict';

angular.module('myApp').controller('BusinessCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerList = [];
		$scope.channelList = [];
		$scope.memberList = [];
		$scope.checkCustomer = {
			show: false,
			ownerId: '',
			ownerName: '',
			list: [],
			showClose: false
		};
		
		$scope.statusOptions = [
			{ name: '等待处理', value: 'init' },
			{ name: '处理中', value: 'handled' },
			{ name: '完成', value: 'finished' }
		];
		$scope.editCustomer = {
			id: '',
			name: '',
			newPhone: '',
			applyAmount: '',
			finishedAmount: '',
			serverRate: '',
			billingDate: '',
			comment: '',
			status: {}
		};
		
		getCustomerList();
		if ($rootScope.session.role == 'channel-mgr') {
			getChannelList(0, 10, '');
			getMemberList(0, 10, '');
		} else if ($rootScope.session.role == 'channel') {
			getMemberList(0, 10, '');
		}
		
		//functions
		$scope.onEditCustomer = function (customer) {
			$scope.editCustomer.id = customer.id;
			$scope.editCustomer.name = customer.name;
			$scope.editCustomer.applyAmount = customer.apply_amount;
			$scope.editCustomer.finishedAmount = customer.finished_amount;
			$scope.editCustomer.serverRate = customer.server_rate;
			$scope.editCustomer.billingDate = customer.billing_date;
			$scope.editCustomer.comment = customer.comment;
			for (var i = 0; i < $scope.statusOptions.length; ++i) {
				if ($scope.statusOptions[i].name == customer.status) {
					$scope.editCustomer.status = $scope.statusOptions[i];
				}
			}
			$('#editDialog').modal({ backdrop: false, keyboard: false });
		};
		
		$scope.onSaveCustomer = function () {
			if ($scope.editForm.$invalid) {
				return;
			}
			var dataObj = {
				phone: $scope.editCustomer.newPhone,
				finished_amount: $scope.editCustomer.finishedAmount,
				server_rate: $scope.editCustomer.serverRate,
				billing_date: $scope.editCustomer.billingDate,					
				comment: $scope.editCustomer.comment,
				status: $scope.editCustomer.status.value
			};
			BusinessService.updateCustomer($rootScope.session.token, $scope.editCustomer.id, dataObj, function (res) {
				alert(JSON.stringify(res));
				getCustomerList();
				$('#editDialog').modal('toggle');
			}, function (res) {
				alert(res.message);
			});
		};
		
		$scope.onCheckCustomers = function (owner) {
			$scope.checkCustomer.show = true;
			$scope.checkCustomer.showClose = true;
			$scope.checkCustomer.ownerId = owner.id;
			$scope.checkCustomer.ownerName = owner.true_name;
			$('#myTabs a[href="#checkCustomers"]').tab('show');
			getCustomerListById(owner.id, 0, 0, '');
		};
		
		$scope.onCloseCheck = function () {
			$('#myTabs a[href="#myCustomers"]').tab('show');
			$scope.checkCustomer.show = false;
			$scope.checkCustomer.showClose = false;
		}
		
		function getCustomerList() {
			BusinessService.getCustomers($rootScope.session.token, function (res) {
				$scope.customerList = res.customerList;
				for (var i = 0; i < $scope.customerList.length; ++i) {
					$scope.customerList[i].createDate = $scope.getDateString($scope.customerList[i].create_on * 1000);
					$scope.customerList[i].status = getStatusName($scope.customerList[i].status);
					$scope.customerList[i].phoneList = $scope.customerList[i].phone.split(',');
					$scope.customerList[i].showDetails = false;
				}
			}, function (res) {
				alert(res.message);
			});
		}
		
		function getChannelList(offset, limit, filter) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			BusinessService.getChannels($rootScope.session.token, paramObj, function (res) {
				$scope.channelList = res.channelsList;
				for (var i = 0; i < $scope.channelList.length; ++i) {
					$scope.channelList[i].createDate = $scope.getDateString($scope.channelList[i].create_on * 1000);
					$scope.channelList[i].showDetails = false;
				}
			}, function (res) {
				alert(res.message);
			});
		}
		
		function getMemberList(offset, limit, filter) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			BusinessService.getMembers($rootScope.session.token, paramObj, function (res) {
				$scope.memberList = res.membersList;
				for (var i = 0; i < $scope.memberList.length; ++i) {
					$scope.memberList[i].createDate = $scope.getDateString($scope.memberList[i].create_on * 1000);
					$scope.memberList[i].showDetails = false;
				}
			}, function (res) {
				alert(res.message);
			});
		}
		
		function getCustomerListById(userId, offset, limit, filter) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			BusinessService.getCustomersById($rootScope.session.token, userId, function (res) {
				$scope.checkCustomer.list = res.customerList;
				for (var i = 0; i < $scope.checkCustomer.list.length; ++i) {
					$scope.checkCustomer.list[i].createDate = $scope.getDateString($scope.customerList[i].create_on * 1000);
					$scope.checkCustomer.list[i].status = getStatusName($scope.checkCustomer.list[i].status);
					$scope.checkCustomer.list[i].showDetails = false;
				}
			}, function (res) {
				alert(res.message);
			});
		}
		
		function getStatusName(status) {
			for (var i = 0; i < $scope.statusOptions.length; ++i) {
				if (status == $scope.statusOptions[i].value) {
					return $scope.statusOptions[i].name;
				}
			}
		}
		
		//jQuery
		$('#myTabs a[href="#myCustomers"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
			$scope.$apply(function () {
				$scope.checkCustomer.showClose = false;
			});
		})
		
		$('#myTabs a[href="#myChannels"]').click(function (e) {
			e.preventDefault()
			$(this).tab('show');
			$scope.$apply(function () {
				$scope.checkCustomer.showClose = false;
			});
		})
		
		$('#myTabs a[href="#myMembers"]').click(function (e) {
			e.preventDefault()
			$(this).tab('show');
			$scope.$apply(function () {
				$scope.checkCustomer.showClose = false;
			});
		})
		
		$('#myTabs a[href="#checkCustomers"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
			$scope.$apply(function () {
				$scope.checkCustomer.showClose = true;
			});
		})
	}]);