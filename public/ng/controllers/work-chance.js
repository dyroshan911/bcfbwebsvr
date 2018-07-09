'use strict';

angular.module('myApp').controller('WorkChanceCtrl', ['$location', '$rootScope', function ($location, $rootScope) {
	//jQuery
	$('#myTabs a[href="#tab1"]').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})

	$('#myTabs a[href="#tab2"]').click(function (e) {
		e.preventDefault()
		$(this).tab('show');
	})

	$('#myTabs a[href="#tab3"]').click(function (e) {
		e.preventDefault()
		$(this).tab('show');
	})

	$('#myTabs a[href="#tab4"]').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
}]);