'use strict';

angular.module('myApp').factory('ProductService', ['ApiService',
    function (ApiService) {
        var cfgData = {};
        
        /*
             dataObj:{
                    title: 信用贷款
                    type: 信用贷,
                    money_min:1万,
                    money_max:100万,
                    rate_min:0.70 ,
                    rate_max:1.90,
                    detail:审核快速，申请简单
             }
        */
        cfgData.addProduct = function (token, dataObj, successcb, failcb) {
            var obj = {
                params: {
                    token: token
                },
                data: dataObj
            };
            return ApiService.post('api/products', obj, successcb, failcb);
        };

        cfgData.getProducts = function (token, paramObj, successcb, failcb) {
            var obj = {
                params: {
                    token: token,
                    offset: paramObj.offset,
                    limit: paramObj.limit
                }
            };
            return ApiService.get('api/products', obj, successcb, failcb);
        };

        cfgData.removeProduct = function (token, productId, successcb, failcb) {
            var obj = {
                params: {
                    token: token
                }
            };
            var url = 'api/products/' + productId;
            return ApiService.delete(url, obj, successcb, failcb);
        };

        return cfgData;
    }]);