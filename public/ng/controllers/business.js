'use strict';

angular.module('myApp').controller('BusinessCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.customerList = [];
		$scope.channelList = [];
		$scope.memberList = [];
		$scope.checkMember = {
			show: false,
			ownerId: '',
			ownerName: '',
			list: []
		};
		$scope.checkCustomer = {
			show: false,
			ownerId: '',
			ownerName: '',
			list: []
		};
		$scope.checkPolicy = {
			show: false,
			ownerId: '',
			ownerName: '',
			list: []
		};

		$scope.tabNames = {
			customer: '我的客户',
			channel: '我的渠道',
			member: '我的会员'
		};

		var eachPageCount = 10;
		$scope.customerPageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.channelPageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.memberPageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.checkMemberPageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.checkCustomerPageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.checkPolicyPageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.currentPageData = $scope.customerPageData;

		$scope.sexOptions = [
			{ name: '先生', value: 'male' },
			{ name: '女士', value: 'female' }
		];
		$scope.statusOptions = [
			{ name: '等待处理', value: 'init' },
			{ name: '处理中', value: 'handled' },
			{ name: '明日上门', value: 'tomorrow_come' },
			{ name: '已经上门', value: 'aweek_need' },
			{ name: '一周需要', value: 'coming' },
			{ name: '放款成功', value: 'success' },
			{ name: '完成', value: 'finished' },
		];
		$scope.editCustomer = {
			selectedCustomer: {},
			id: '',
			name: '',
			sex: '',
			newPhone: '',
			applyAmount: '',
			finishedAmount: '',
			serverRate: '',
			comment: '',
			status: {},
			checkAmount: true
		};

		$scope.filterOptions = [
			{ name: '所有', value: '' },
			{ name: '等待处理', value: 'init' },
			{ name: '处理中', value: 'handled' },
			{ name: '明日上门', value: 'tomorrow_come' },
			{ name: '已经上门', value: 'aweek_need' },
			{ name: '一周需要', value: 'coming' },
			{ name: '放款成功', value: 'success' },
			{ name: '完成', value: 'finished' }
		];
		$scope.selectedFilterCustomer = $scope.filterOptions[0];
		$scope.selectedFilterCheckCustomer = $scope.filterOptions[0];

		$scope.search = '';

		getCustomerList(0, eachPageCount, '');
		if ($rootScope.session.role == 'admin') {
			getChannelList(0, eachPageCount, '');
			getMemberList(0, eachPageCount, '');
			$scope.tabNames.customer = '客户列表';
			$scope.tabNames.channel = '渠道列表';
			$scope.tabNames.member = '会员列表';
			$('#myTabs a[href="#myChannels"]').tab('show');
		} else if ($rootScope.session.role == 'channel-mgr') {
			getChannelList(0, eachPageCount, '');
			getMemberList(0, eachPageCount, '');
			$('#myTabs a[href="#myChannels"]').tab('show');
		} else if ($rootScope.session.role == 'channel') {
			getMemberList(0, eachPageCount, '');
		}

		//functions
		$scope.onChangeFilterCustomer = function () {
			var filter = '';
			if ($scope.search.length != 0) {
				filter = $scope.search;
				if ($scope.selectedFilterCustomer.value.length != 0) {
					filter += ',' + $scope.selectedFilterCustomer.value;
				}
			} else {
				filter = $scope.selectedFilterCustomer.value;
			}
			getCustomerList(0, eachPageCount, filter);
		};

		$scope.onChangeFilterCheckCustomer = function () {
			var filter = '';
			if ($scope.search.length != 0) {
				filter = $scope.search;
				if ($scope.selectedFilterCheckCustomer.value.length != 0) {
					filter += ',' + $scope.selectedFilterCheckCustomer.value;
				}
			} else {
				filter = $scope.selectedFilterCheckCustomer.value;
			}
			getCustomerListById($scope.checkCustomer.ownerId, 0, eachPageCount, filter);
		};

		$scope.onEditComment = function (member) {
			member.changed = true;
		}

		$scope.onComitComment = function (member) {
			if (member.changed == true) {
				member.changed = false;
				var dataObj = {
					comment: member.comment
				}
				BusinessService.updateMemberById($rootScope.session.token, member.id, dataObj, function (res) {

				}, function (err) {
					alert(err.message);
				});
			}
		}

		$scope.onGetOwner = function (customer) {
			if (!customer.belong_mem) {
				customer.owner = '不属于任何会员';
				return;
			}
			var userId = customer.belong_mem;
			BusinessService.getOwnerById($rootScope.session.token, userId, function (res) {
				customer.owner = res.true_name + '，' + res.phone;
			}, function (err) {
				alert(err.message);
			});
		};

		$scope.onEditCustomer = function (customer) {
			$scope.editCustomer.selectedCustomer = customer;
			$scope.editCustomer.id = customer.id;
			$scope.editCustomer.name = customer.name;
			$scope.editCustomer.sex = customer.sex;
			$scope.editCustomer.newPhone = '';
			$scope.editCustomer.applyAmount = customer.apply_amount;
			$scope.editCustomer.finishedAmount = customer.finished_amount;
			$scope.editCustomer.serverRate = $scope.makeFloat(parseFloat(customer.server_rate));
			$scope.editCustomer.comment = customer.comment;
			var billingDate = customer.billing_date;
			if ($scope.editCustomer.billingDate) {
				var date = $scope.getDateString($scope.editCustomer.billingDate * 1000).slice(0, 10);
				$('#datepicker-input').attr('value', date);
			}
			$('#datepicker').datepicker({
				format: 'yyyy-mm-dd',
				language: 'zh-CN',
				clearBtn: true,
				todayBtn: 'linked',
				autoclose: true,
				todayHighlight: true
			});
			for (var i = 0; i < $scope.statusOptions.length; ++i) {
				if (customer.statusName == $scope.statusOptions[i].name) {
					$scope.editCustomer.status = $scope.statusOptions[i];
				}
			}
			$('#editDialog').modal({ backdrop: false, keyboard: false });
		};

		$scope.onSaveCustomer = function () {
			if ($scope.editForm.$invalid) {
				return;
			}
			var billingDate = $('#datepicker').datepicker('getDate');
			if (billingDate) {
				billingDate = billingDate.getTime() / 1000;
			}
			var dataObj = {
				name: $scope.editCustomer.name,
				sex: $scope.editCustomer.sex,
				phone: $scope.editCustomer.newPhone,
				finished_amount: $scope.editCustomer.finishedAmount,
				server_rate: $scope.editCustomer.serverRate,
				billing_date: billingDate,
				comment: $scope.editCustomer.comment,
				status: $scope.editCustomer.status.value
			};
			$scope.myPromiseUpdate = BusinessService.updateCustomer($rootScope.session.token, $scope.editCustomer.id, dataObj, function (res) {
				//alert(JSON.stringify(res));
				$scope.editCustomer.selectedCustomer.name = $scope.editCustomer.name;
				$scope.editCustomer.selectedCustomer.sex = $scope.editCustomer.sex;
				$scope.editCustomer.selectedCustomer.name = $scope.editCustomer.name;
				$scope.editCustomer.selectedCustomer.finished_amount = $scope.editCustomer.finishedAmount;
				$scope.editCustomer.selectedCustomer.server_rate = $scope.editCustomer.serverRate;
				$scope.editCustomer.selectedCustomer.billing_date = $scope.editCustomer.billing_date;
				$scope.editCustomer.selectedCustomer.comment = $scope.editCustomer.comment;
				$scope.editCustomer.selectedCustomer.status = $scope.editCustomer.status.value;
				$scope.editCustomer.selectedCustomer.statusName = $scope.editCustomer.status.name;
				$('#editDialog').modal('toggle');
			}, function (err) {
				alert(err.message);
			});
		};

		$scope.onCheckAmount = function () {
			if (parseInt($scope.editCustomer.finishedAmount) > parseInt($scope.editCustomer.applyAmount)) {
				$scope.editCustomer.checkAmount = false;
			} else {
				$scope.editCustomer.checkAmount = true;
			}
		};

		$scope.onCheckMembers = function (owner) {
			$scope.checkMember.show = true;
			$scope.checkMember.ownerId = owner.id;
			$scope.checkMember.ownerName = owner.true_name;
			$('#myTabs a[href="#checkMembers"]').tab('show');
			getMemberListById(owner.id, 0, eachPageCount, '');
		};

		$scope.onCheckCustomers = function (owner) {
			$scope.checkCustomer.show = true;
			$scope.checkCustomer.ownerId = owner.id;
			$scope.checkCustomer.ownerName = owner.true_name;
			$('#myTabs a[href="#checkCustomers"]').tab('show');
			getCustomerListById(owner.id, 0, eachPageCount, '');
		};

		$scope.onCheckPolicy = function (owner) {
			$scope.checkCustomer.show = true;
			$scope.checkCustomer.ownerId = owner.id;
			$scope.checkCustomer.ownerName = owner.true_name;
			$('#myTabs a[href="#checkPolicy"]').tab('show');
			getPolicyListById(owner.id, 0, eachPageCount, '');
		};

		$scope.onCloseCheck = function (tabName) {
			$scope.currentPageData = {};
			$('#myTabs a[href="#myCustomers"]').tab('show');
			switch (tabName) {
				case 'member': {
					$scope.checkMember.show = false;
					break;
				}
				case 'customer': {
					$scope.checkCustomer.show = false;
					break;
				}
				case 'policy': {
					$scope.checkCustomer.show = false;
					break;
				}
				default:
					break;
			}
		};

		$scope.gotoPage = function (pageData, index) {
			selectPage(pageData, index);
		};

		$scope.onSearch = function () {
			getPageList($scope.currentPageData, '0');
		};

		function getCustomerList(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseCustomers = BusinessService.getCustomers($rootScope.session.token, paramObj, function (res) {
				$scope.customerList = res.customerList;
				for (var i = 0; i < $scope.customerList.length; ++i) {
					$scope.customerList[i].createDate = $scope.getDateString($scope.customerList[i].create_on * 1000);
					$scope.customerList[i].billingDate = $scope.customerList[i].billing_date ? $scope.getDateString($scope.customerList[i].billing_date * 1000).slice(0, 10) : '';
					$scope.customerList[i].statusName = getNameByValue($scope.customerList[i].status, $scope.statusOptions);
					$scope.customerList[i].sexName = getNameByValue($scope.customerList[i].sex, $scope.sexOptions);
					var phoneList = $scope.customerList[i].phone.split(',');
					$scope.customerList[i].phoneList = makePhoneList(phoneList);
					$scope.customerList[i].showDetails = false;
					$scope.customerList[i].owner = null;
				}
				var total = res.total;
				if (total >= 0) {
					$scope.customerPageData.total = parseInt(total / eachPageCount);
					if ((total % eachPageCount) != 0) {
						$scope.customerPageData.total++;
					}
					currentPageIndex = currentPageIndex || '0';
					sortPages($scope.customerPageData, currentPageIndex);
					setCurrentPage($scope.customerPageData, currentPageIndex);
				}
			}, function (err) {
				alert(err.message);
			});
		}

		function getChannelList(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseChannels = BusinessService.getChannels($rootScope.session.token, paramObj, function (res) {
				$scope.channelList = res.channelsList;
				for (var i = 0; i < $scope.channelList.length; ++i) {
					$scope.channelList[i].createDate = $scope.getDateString($scope.channelList[i].create_on * 1000);
					$scope.channelList[i].showDetails = false;
				}
				var total = res.total;
				if (total >= 0) {
					$scope.channelPageData.total = parseInt(total / eachPageCount);
					if ((total % eachPageCount) != 0) {
						$scope.channelPageData.total++;
					}
					currentPageIndex = currentPageIndex || '0';
					sortPages($scope.channelPageData, currentPageIndex);
					setCurrentPage($scope.channelPageData, currentPageIndex);
				}
			}, function (err) {
				alert(err.message);
			});
		}

		function getMemberList(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseMembers = BusinessService.getMembers($rootScope.session.token, paramObj, function (res) {
				$scope.memberList = res.membersList;
				for (var i = 0; i < $scope.memberList.length; ++i) {
					$scope.memberList[i].createDate = $scope.getDateString($scope.memberList[i].create_on * 1000);
					$scope.memberList[i].showDetails = false;
				}
				var total = res.total;
				if (total >= 0) {
					$scope.memberPageData.total = parseInt(total / eachPageCount);
					if ((total % eachPageCount) != 0) {
						$scope.memberPageData.total++;
					}
					currentPageIndex = currentPageIndex || '0';
					sortPages($scope.memberPageData, currentPageIndex);
					setCurrentPage($scope.memberPageData, currentPageIndex);
				}
			}, function (err) {
				alert(err.message);
			});
		}

		function getMemberListById(userId, offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseCheckMembers = BusinessService.getMembersById($rootScope.session.token, userId, paramObj, function (res) {
				$scope.checkMember.list = res.membersList;
				for (var i = 0; i < $scope.checkMember.list.length; ++i) {
					$scope.checkMember.list[i].showDetails = false;
				}
				var total = res.total;
				if (total >= 0) {
					$scope.checkMemberPageData.total = parseInt(total / eachPageCount);
					if ((total % eachPageCount) != 0) {
						$scope.checkMemberPageData.total++;
					}
					currentPageIndex = currentPageIndex || '0';
					sortPages($scope.checkMemberPageData, currentPageIndex);
					setCurrentPage($scope.checkMemberPageData, currentPageIndex);
				}
			}, function (err) {
				alert(err.message);
			});
		}

		function getCustomerListById(userId, offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseCheckCustomers = BusinessService.getCustomersById($rootScope.session.token, userId, paramObj, function (res) {
				$scope.checkCustomer.list = res.customerList;
				for (var i = 0; i < $scope.checkCustomer.list.length; ++i) {
					$scope.checkCustomer.list[i].createDate = $scope.getDateString($scope.checkCustomer.list[i].create_on * 1000);
					$scope.checkCustomer.list[i].billingDate = $scope.checkCustomer.list[i].billing_date ? $scope.getDateString($scope.checkCustomer.list[i].billing_date * 1000).slice(0, 10) : '';
					$scope.checkCustomer.list[i].statusName = getNameByValue($scope.checkCustomer.list[i].status, $scope.statusOptions);
					$scope.checkCustomer.list[i].sexName = getNameByValue($scope.checkCustomer.list[i].sex, $scope.sexOptions);
					$scope.checkCustomer.list[i].showDetails = false;
				}
				var total = res.total;
				if (total >= 0) {
					$scope.checkCustomerPageData.total = parseInt(total / eachPageCount);
					if ((total % eachPageCount) != 0) {
						$scope.checkCustomerPageData.total++;
					}
					currentPageIndex = currentPageIndex || '0';
					sortPages($scope.checkCustomerPageData, currentPageIndex);
					setCurrentPage($scope.checkCustomerPageData, currentPageIndex);
				}
			}, function (err) {
				alert(err.message);
			});
		}

		function getPolicyListById(userId, offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseCheckPolicy = BusinessService.getPolicysById($rootScope.session.token, userId, paramObj, function (res) {
				$scope.checkPolicy.list = res.policysList;
				for (var i = 0; i < $scope.checkPolicy.list.length; i++) {
					var policy = $scope.checkPolicy.list[i];
					policy.effectiveTime = $scope.getDateString(policy.effective_time, true);
				}
				var total = res.total;
				if (total >= 0) {
					$scope.checkPolicyPageData.total = parseInt(total / eachPageCount);
					if ((total % eachPageCount) != 0) {
						$scope.checkPolicyPageData.total++;
					}
					currentPageIndex = currentPageIndex || '0';
					sortPages($scope.checkPolicyPageData, currentPageIndex);
					setCurrentPage($scope.checkPolicyPageData, currentPageIndex);
				}
			}, function (err) {
				alert(err.message);
			});
		}

		function getNameByValue(value, list) {
			for (var i = 0; i < list.length; ++i) {
				if (value == list[i].value) {
					return list[i].name;
				}
			}
		}

		function makePhoneList(list) {
			var phoneList = [];
			for (var i = 0; i < list.length; ++i) {
				phoneList.push({ index: i, value: list[i] });
			}
			return phoneList;
		}

		//pages
		function sortPages(pageData, selectedIndex) {
			var list = pageData.list;
			var count = pageData.total;
			list.splice(0, list.length);
			if (count > 1) {
				list.push({ name: '|<<', index: 'start' });
				list.push({ name: '<<', index: '-' });
			}
			selectedIndex = parseInt(selectedIndex);
			if (selectedIndex <= 4) {
				var max = count < 5 ? count : 5;
				for (var i = 1; i <= max; ++i) {
					list.push({ name: i.toString(), index: (i - 1).toString() });
				}
				if (count > 5) {
					list.push({ name: '...', index: '.' });
				}
			}
			else if (selectedIndex >= count - 5) {
				list.push({ name: '...', index: '.' });
				for (var i = count - 4; i <= count; ++i) {
					list.push({ name: i.toString(), index: (i - 1).toString() });
				}
			}
			else {
				list.push({ name: '...', index: '.' });
				for (var i = selectedIndex - 1; i <= selectedIndex + 3; ++i) {
					list.push({ name: i.toString(), index: (i - 1).toString() });
				}
				list.push({ name: '...', index: '.' });
			}
			if (count > 1) {
				list.push({ name: '>>', index: '+' });
				list.push({ name: '>>|', index: 'end' });
			}
		}

		function selectPage(pageData, selectedIndex) {
			var pageIndex = '';
			if (selectedIndex == '.') {
				return;
			}
			else if (selectedIndex == '-') {
				if (parseInt(pageData.current.index) == 0) {
					return;
				}
				pageIndex = (parseInt(pageData.current.index) - 1).toString();
			}
			else if (selectedIndex == '+') {
				if (parseInt(pageData.current.index) == pageData.total - 1) {
					return;
				}
				pageIndex = (parseInt(pageData.current.index) + 1).toString();
			}
			else if (selectedIndex == 'start') {
				if (parseInt(pageData.current.index) == 0) {
					return;
				}
				pageIndex = '0';
			}
			else if (selectedIndex == 'end') {
				if (parseInt(pageData.current.index) == pageData.total - 1) {
					return;
				}
				pageIndex = (pageData.total - 1).toString();
			}
			else {
				pageIndex = selectedIndex;
			}
			sortPages(pageData, pageIndex);
			getPageList(pageData, pageIndex);
		}

		function setCurrentPage(pageData, selectedIndex) {
			for (var i = 0; i < pageData.list.length; ++i) {
				if (pageData.list[i].index == selectedIndex) {
					pageData.current = pageData.list[i];
					return;
				}
			}
		}

		function getPageList(pageData, pageIndex) {
			switch (pageData) {
				case $scope.customerPageData: {
					var filter = '';
					if ($scope.search.length != 0) {
						filter = $scope.search;
						if ($scope.selectedFilterCustomer.value.length != 0) {
							filter += ',' + $scope.selectedFilterCustomer.value;
						}
					} else {
						filter = $scope.selectedFilterCustomer.value;
					}
					getCustomerList(parseInt(pageIndex) * eachPageCount, eachPageCount, filter, pageIndex);
					break;
				}
				case $scope.channelPageData: {
					getChannelList(parseInt(pageIndex) * eachPageCount, eachPageCount, $scope.search, pageIndex);
					break;
				}
				case $scope.memberPageData: {
					getMemberList(parseInt(pageIndex) * eachPageCount, eachPageCount, $scope.search, pageIndex);
					break;
				}
				case $scope.checkMemberPageData: {
					getMemberList(parseInt(pageIndex) * eachPageCount, eachPageCount, $scope.search, pageIndex);
					break;
				}
				case $scope.checkCustomerPageData: {
					var filter = '';
					if ($scope.search.length != 0) {
						filter = $scope.search;
						if ($scope.selectedFilterCheckCustomer.value.length != 0) {
							filter += ',' + $scope.selectedFilterCheckCustomer.value;
						}
					} else {
						filter = $scope.selectedFilterCheckCustomer.value;
					}
					getCustomerListById($scope.checkCustomer.ownerId, parseInt(pageIndex) * eachPageCount, eachPageCount, filter, pageIndex);
					break;
				}
				case $scope.checkPolicyPageData: {
					getPolicyListById($scope.checkPolicy.ownerId, parseInt(pageIndex) * eachPageCount, eachPageCount, '', pageIndex);
					break;
				}
				default:
					break;
			}
		}

		//jQuery
		$('#myTabs a[href="#myCustomers"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		})

		$('#myTabs a[href="#myChannels"]').click(function (e) {
			e.preventDefault()
			$(this).tab('show');
		})

		$('#myTabs a[href="#myMembers"]').click(function (e) {
			e.preventDefault()
			$(this).tab('show');
		})

		$('#myTabs a[href="#checkMembers"]').click(function (e) {
			e.preventDefault()
			$(this).tab('show');
		})

		$('#myTabs a[href="#checkCustomers"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		})

		$('#myTabs a[href="#checkPolicy"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		})

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var tabName = e.target.hash;
			$scope.$apply(function () {
				switch (tabName) {
					case '#myCustomers': {
						$scope.currentPageData = $scope.customerPageData;
						break;
					}
					case '#myChannels': {
						$scope.currentPageData = $scope.channelPageData;
						break;
					}
					case '#myMembers': {
						$scope.currentPageData = $scope.memberPageData;
						break;
					}
					case '#checkMembers': {
						$scope.currentPageData = $scope.checkMemberPageData;
						break;
					}
					case '#checkCustomers': {
						$scope.currentPageData = $scope.checkCustomerPageData;
						break;
					}
					case '#checkPolicy': {
						$scope.currentPageData = $scope.checkPolicyPageData;
						break;
					}
					default:
						break;
				}
			});
		})
	}]);
