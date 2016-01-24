'use strict';

angular.module('myApp').factory('SuccessCaseService', ['ApiService',
    function (ApiService) {
        var cfgData = {};
        
        /*
             dataObj:{
                    name: 王先生
                    type: 信用贷,
                    amount:1万,
                    time_limit:36个月,
                    rate:0.70 ,
                    date:2015年3月,
                    detail:XXXXXXXXXXXXXXXXXXXXXXXXXX
             }
        */
        cfgData.addSuccessCase = function (token, dataObj, successcb, failcb) {
            var obj = {
                params: {
                    token: token
                },
                data: dataObj
            };
            return ApiService.post('api/cases', obj, successcb, failcb);
        };

        cfgData.getSuccessCases = function (token, paramObj, successcb, failcb) {
            var obj = {
                params: {
                    token: token,
                    offset: paramObj.offset,
                    limit: paramObj.limit,
                }
            };
            return ApiService.get('api/cases', obj, successcb, failcb);
        };

        cfgData.removeSuccessCase = function (token, successCaseId, successcb, failcb) {
            var obj = {
                params: {
                    token: token
                }
            };
            var url = 'api/cases/' + successCaseId;
            return ApiService.delete(url, obj, successcb, failcb);
        };

        return cfgData;
    }]);