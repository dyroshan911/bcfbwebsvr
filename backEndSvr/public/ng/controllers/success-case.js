'use strict';

angular.module('myApp').controller('SuccessCaseCtrl', ['$scope', '$location', '$rootScope', 'SuccessCaseService',
	function ($scope, $location, $rootScope, SuccessCaseService) {
		$scope.caseList = [];
		$scope.pageData = {
			current: {},
			list: [],
			total: 0
		};
		$scope.search = '';
		
		$scope.addCaseData = {
			name: '',
			type: '',
			amount: '',
			timeLimit: '',
			rate: '',
			date: '',
			detail: ''
		};
		$scope.updateCaseData = {
			selectedCase: {},
			name: '',
			type: '',
			amount: '',
			timeLimit: '',
			rate: '',
			date: '',
			detail: ''
		};
		
		getCaseList(0, $scope.eachPageCount, '');
		
		//functions
		$scope.gotoPage = function (pageData, index) {
			$scope.selectPage(pageData, index, getPageList);
		};
		
		$scope.onSearch = function () {
			getPageList($scope.pageData, '0');
		};
		
		$scope.onAddCase = function () {
			$('#datepickerAdd').datepicker({
				format: 'yyyy-mm-dd',
				language: 'zh-CN',
				clearBtn: true,
				todayBtn: 'linked',
				autoclose: true,
				todayHighlight: true
			});
			$('#addDialog').modal({ backdrop: false, keyboard: false });
		};
		
		$scope.onAdd = function () {
			if ($scope.addForm.$invalid) {
				return;
			}
			var date = $('#datepickerAdd').datepicker('getDate');
			if (date) {
				date = date.getTime() / 1000;
			}
			var dataObj = {
				name: $scope.addCaseData.name,
				type: $scope.addCaseData.type,
				amount: $scope.makeFloat(parseFloat($scope.addCaseData.amount)),
				time_limit: $scope.addCaseData.timeLimit,
				rate: $scope.makeFloat(parseFloat($scope.addCaseData.rate)),
				date: date,
				detail: $scope.addCaseData.detail,
			};
			$scope.myPromiseAdd = SuccessCaseService.addSuccessCase($rootScope.session.token, dataObj, function (res) {
				getCaseList($scope.eachPageCount * parseInt($scope.pageData.current.index), $scope.eachPageCount, $scope.search, $scope.pageData.current.index);
				alert('新增案例成功');
				$('#addDialog').modal('toggle');
			}, function (err) {
				alert(err.message);
			});
		}
		
		$scope.onEditCase = function (theCase) {
			$scope.updateCaseData.selectedCase = theCase;
			$scope.updateCaseData.name = theCase.name;
			$scope.updateCaseData.type = theCase.type;
			$scope.updateCaseData.amount = theCase.amount;
			$scope.updateCaseData.timeLimit = theCase.time_limit;
			$scope.updateCaseData.rate = theCase.rate;
			$scope.updateCaseData.date = theCase.date;
			$scope.updateCaseData.detail = theCase.detail;
			if ($scope.updateCaseData.date) {
				var date = $scope.getDateString($scope.updateCaseData.date * 1000).slice(0, 10);
				$('#datepicker-input-update').attr('value', date);
			}
			$('#datepickerUpdate').datepicker({
				format: 'yyyy-mm-dd',
				language: 'zh-CN',
				clearBtn: true,
				todayBtn: 'linked',
				autoclose: true,
				todayHighlight: true
			});
			$('#editDialog').modal({ backdrop: false, keyboard: false });
		};
		
		$scope.onSave = function () {
			if ($scope.updateForm.$invalid) {
				return;
			}
			var date = $('#datepickerUpdate').datepicker('getDate');
			if (date) {
				$scope.updateCaseData.date = date.getTime() / 1000;
			}
			var dataObj = {
				name: $scope.updateCaseData.name,
				type: $scope.updateCaseData.type,
				amount: $scope.makeFloat(parseFloat($scope.updateCaseData.amount)),
				time_limit: $scope.updateCaseData.timeLimit,
				rate: $scope.makeFloat(parseFloat($scope.updateCaseData.rate)),
				date: $scope.updateCaseData.date,
				detail: $scope.updateCaseData.detail,
			};
			$scope.myPromiseEdit = SuccessCaseService.updateSuccessCase($rootScope.session.token, $scope.updateCaseData.selectedCase.id, dataObj, function (res) {
				$scope.updateCaseData.selectedCase.name = $scope.updateCaseData.name;
				$scope.updateCaseData.selectedCase.type = $scope.updateCaseData.type;
				$scope.updateCaseData.selectedCase.amount = $scope.updateCaseData.amount;
				$scope.updateCaseData.selectedCase.time_limit = $scope.updateCaseData.timeLimit;
				$scope.updateCaseData.selectedCase.rate = $scope.updateCaseData.rate;
				$scope.updateCaseData.selectedCase.date = $scope.updateCaseData.date;
				$scope.updateCaseData.selectedCase.applyDate = $scope.getDateString($scope.updateCaseData.selectedCase.date * 1000).slice(0, 10);;
				$scope.updateCaseData.selectedCase.detail = $scope.updateCaseData.detail;
				$('#editDialog').modal('toggle');
			}, function (err) {
				alert(err.message);
			});
		};
		
		$scope.onRemoveCase = function (index, theCase) {
			var msg = '确定将 “' + theCase.title + '” 从产品列表中移除吗？';
			var answer = window.confirm(msg);
			if (answer === true) {
				$scope.myPromiseCase = SuccessCaseService.removeSuccessCase($rootScope.session.token, theCase.id, function (res) {
					alert('删除成功');
					$scope.caseList.splice(index, 1);
					if ($scope.caseList.length == 0) {
						$scope.pageData = {
							current: {},
							list: [],
							total: 0
						};
					}
				}, function (err) {
					alert(err.message);
				});
			} else {
				return;
			}
		}
		
		function getCaseList(offset, limit, filter, currentPageIndex) {
			var paramObj = {
				offset: offset,
				limit: limit,
				filter: filter
			};
			$scope.myPromiseCase = SuccessCaseService.getSuccessCases($rootScope.session.token, paramObj, function (res) {
				$scope.caseList = res.casesList;
				for (var i = 0; i < $scope.caseList.length; ++i) {
					if ($scope.caseList[i].date) {
						$scope.caseList[i].applyDate = $scope.getDateString($scope.caseList[i].date * 1000).slice(0, 10);
					}
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
		
		function getPageList(pageData, pageIndex) {
			getCaseList(parseInt(pageIndex) * $scope.eachPageCount, $scope.eachPageCount, $scope.search, pageIndex);
		}
	}]);