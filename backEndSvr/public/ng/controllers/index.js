'use strict';

angular.module('myApp').controller('IndexCtrl', ['$scope', '$location', '$rootScope', 'UserService', 'SessionService', 
	function ($scope, $location, $rootScope, UserService, SessionService) {
		//functions
		$scope.logout = function () {
			SessionService.deleteSessionUser($rootScope.session.token, function (data) {
				$location.path('/login');
			}, function (err) {
				alert(res.message);
			});
		};

		$scope.getDateString = function (timestamp) {
			var ts = timestamp || 0;
			var date = new Date(ts);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			var d = date.getDate();
			var h = date.getHours();
			var i = date.getMinutes();
			var s = date.getSeconds();
			return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' , ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
		};
	}]);