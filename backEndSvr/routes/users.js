var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');
var usersDB = require("../services/db").Users;
var nodeExcel = require('excel-export');

/** a common fcuntion to package response */

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}



/* get all my channel user accounts info  */
router.get('/', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    //todo: get all account list
    users.getChannelsList(offset, limit, filter, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* create channel user. */
router.post('/', function (req, res) {
    var accountObj = {
        user_name: req.body.data.user_name,
        email: req.body.data.email,
        phone: req.body.data.phone,
        true_name: req.body.data.true_name,
        role: req.body.data.role,
        superior: req.body.data.superior
    };
    //todo: verify checkcode
    //...
    users.creatAccount(accountObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get all my channel mgrlist user accounts info  */
router.get('/mgr', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    //todo: get all account list
    users.getChannelsMgrList(offset, limit, filter, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get all customer  */
router.get('/customer', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;

    usersDB.getCustomerList(function (err, doc) {
        var conf ={};
              // uncomment it for style example  
              // conf.stylesXmlFile = "styles.xml";
            conf.cols = [{
                caption:'姓名',
                type:'string'
            },{
                caption:'性别',
                type:'string',
            },{
                caption:'联系电话',
                type:'string',
                width:40
            },{
                caption:'申请金额',
                type:'number'
            },{
                caption:'备注',
                type:'string',
                width:80
            },{
                    caption: '状态',
                    type: 'string',
                    width:40
            }];
            conf.rows = [];

            for (var i = 0, size = doc.length; i < size; ++i) {
                var j = 0;
                var str = [];
                str[j++] = doc[i].name;
                if (doc[i].sex == 'male') {
                    str[j++] = "先生";
                } else if (doc[i].sex == 'female') {
                    str[j++] = "女士";
                }
                
                if (doc[i].phone) {
                    str[j++] = doc[i].phone;
                } else {
                    str[j++] = "";
                }
                


                if (doc[i].apply_amount) {
                    str[j++] = doc[i].apply_amount;
                } else {
                    str[j++] = 0;
                }
                
                if (doc[i].comment) {
                    str[j++] = doc[i].comment;
                } else {
                    str[j++] = "";
                }

                if (doc[i].status == 'init') {
                    str[j++] = "等待处理";
                } else if (doc[i].status == 'handled') {
                    str[j++] = "处理中";
                } else if (doc[i].status == 'finished') {
                    str[j++] = "已完成";
                } else if (doc[i].status == 'tomorrow_come') {
                    str[j++] = "明日上门";
                } else if (doc[i].status == 'aweek_need') {
                    str[j++] = "一周后需要";
                } else if (doc[i].status == 'coming') {
                    str[j++] = "已上门";
                } else if (doc[i].status == 'success') {
                    str[j++] = "放款成功";
                } else {
                     str[j++] = "";
                }
                
                

                conf.rows.push(str);
            }
            
            
            result = nodeExcel.execute(conf);
            //todo: get all account list
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "customers.xlsx");
            res.end(result, 'binary');
    });
});



/* update account info */
router.put('/:account_id', function (req, res) {
    var dataObj = req.body.data;
    var accountId = req.params.account_id;
    users.updateAccountInfo(accountId, dataObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


module.exports = router;
