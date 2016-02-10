'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$location', '$rootScope', 'WebShowService', 'BusinessService',
    function ($scope, $location, $rootScope, WebShowService, BusinessService) {
        $('.carousel').carousel({
            interval: 5000
        })

        $scope.staffList = [];
        $scope.productList = [];
        $scope.caseList = [];
        $scope.infoList = [];

        $scope.customerData = {
            name: '',
            sex: 'male',
            phone: '',
            amount: ''
        };

        $scope.applyData = {
            name: '',
            sex: 'male',
            phone: '',
            amount: ''
        };

        getProducts(0, 100, '');
        getCases(0, 100, '');
		
        //functions
        $scope.onApply = function () {
            var dataObj = {
                name: $scope.customerData.name,
                sex: $scope.customerData.sex,
                phone: $scope.customerData.phone,
                apply_amount: $scope.customerData.amount
            };
            $scope.myPromise = BusinessService.addCustomer($rootScope.session.token, dataObj, function (res) {
                //alert(JSON.stringify(res));
                alert('申请成功');
            }, function (err) {
                alert(err.message);
            })
        }

        $scope.onApply_ = function () {
            var dataObj = {
                name: $scope.applyData.name,
                sex: $scope.applyData.sex,
                phone: $scope.applyData.phone,
                apply_amount: $scope.applyData.amount
            };
            $scope.myPromise = BusinessService.addCustomer($rootScope.session.token, dataObj, function (res) {
                //alert(JSON.stringify(res));
                alert('申请成功');
            }, function (err) {
                alert(err.message);
            })
        }

        $scope.staffList = [
            { name: '员工A', phone: '15828540001', business: '信用贷款，企业贷款', content: '资深员工，放款快捷' },
            { name: '员工B', phone: '15828540002', business: '房产抵押贷款', content: '资深员工，放款快捷' },
            { name: '员工C', phone: '15828540003', business: '房产抵押贷款，汽车抵押贷款', content: '资深员工，放款快捷' },
            { name: '员工D', phone: '15828540004', business: '房产抵押贷款，汽车抵押贷款', content: '资深员工，放款快捷' }
        ];

        $scope.infoList = [
            { title: '百城官方网站上线', date: '2016-01-20' },
            { title: '百城微信公众号上线', date: '2016-01-20' },
            { title: '百城会员开放注册', date: '2016-01-10' },
            { title: '百城新业务启动', date: '2015-21-20' },
            { title: '百城新业务启动', date: '2015-21-20' },
            { title: '百城新业务启动', date: '2015-21-20' }
        ];

        function getProducts(offset, limit, filter, currentPageIndex) {
            var paramObj = {
                offset: offset,
                limit: limit,
                filter: filter
            };
            WebShowService.getProducts($rootScope.session.token, paramObj, function (res) {
                $scope.productList = res.productsList;
                for (var i = 0; i < $scope.productList.length; ++i) {
                    $scope.productList[i].amount = $scope.productList[i].money_min + ' ~ ' + $scope.productList[i].money_max + ' 万';
                    $scope.productList[i].rate = $scope.productList[i].rate_min + '% ~ ' + $scope.productList[i].rate_max + '%';
                }
            }, function (err) {
                //alert(err.message);
            });
        }

        function getCases(offset, limit, filter, currentPageIndex) {
            var paramObj = {
                offset: offset,
                limit: limit,
                filter: filter
            };
            WebShowService.getCases($rootScope.session.token, paramObj, function (res) {
                $scope.casesList = res.casesList;
                for (var i = 0; i < $scope.casesList.length; ++i) {
                    $scope.casesList[i].type = $scope.casesList[i].type + ' (' + $scope.casesList[i].time_limit + '个月)';
                    $scope.casesList[i].amount = $scope.casesList[i].amount + '万';
                    $scope.casesList[i].rate = $scope.casesList[i].rate + '%';
                }
            }, function (err) {
                //alert(err.message);
            });
        }
    }]);