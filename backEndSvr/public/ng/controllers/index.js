'use strict';

angular.module('myApp').controller('IndexCtrl', ['$scope', '$location', '$rootScope', 'SessionService', 'UserService',
	function ($scope, $location, $rootScope, SessionService, UserService) {
		//functions
		$scope.onLogout = function () {
			SessionService.deleteSessionUser($rootScope.session.token, function (res) {
				$location.path('/login').search('');
			}, function (err) {
				alert(err.message);
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
		
		$scope.makeFloat = function (n) {
			n = n.toString();
			if (n.indexOf('.') === -1) {
				return n + '.00';
			} else if (n.indexOf('.') === n.length - 2) {
				return n + '0';
			} else {
				return n;
			}
		};
	}]);