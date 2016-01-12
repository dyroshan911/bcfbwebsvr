'use strict';

angular.module('myApp').controller('WarnCtrl', ['$scope', '$location', '$rootScope',
	function ($scope, $location, $rootScope) {
		$scope.warningContent = '';
		
		getWarningType();
		$scope.wechatJsConfig();
		
		//functions
		$scope.onClose = function () {
			wx.closeWindow();
		};
		
		function getWarningType() {
			var type = $location.search().type;
			switch (type) {
				case 'completed':
					$scope.warningContent = '微信号已绑定百城账号，请从微信菜单进入主页。';
					break;
				case 'need_singup':
					$scope.warningContent = '微信号尚未注册，请从微信菜单选择注册百城。';
					break;
				default:
					break;
			}
		}
	}]);