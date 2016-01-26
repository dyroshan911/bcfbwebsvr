'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$location', '$routeParams',
	function ($scope, $location, $routeParams) {
		$scope.currentPage = $routeParams.params;
		$scope.eachPageCount = 5;

		//functions
		//pages
		$scope.sortPages = function (pageData, selectedIndex) {
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
		
		$scope.selectPage = function (pageData, selectedIndex, getPageListCallBack) {
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
			$scope.sortPages(pageData, pageIndex);
			getPageListCallBack(pageData, pageIndex);
		}
		
		$scope.setCurrentPage = function (pageData, selectedIndex) {
			for (var i = 0; i < pageData.list.length; ++i) {
				if (pageData.list[i].index == selectedIndex) {
					pageData.current = pageData.list[i];
					return;
				}
			}
		}
	}]);