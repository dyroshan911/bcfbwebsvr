'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* 说明：
* 小驼峰名称表示是私有或嵌入schema
* 大驼峰表示公有或全局Schema
*/

var modelObj = exports = module.exports = {
};


var AccountSchema = new Schema({
    id:       {type: String, unique: true, required: true},
    user_name: {type: String, unique: true, required: true},    //登录名
    password: {type: String, required: true},                   //密码
    email:    {type: String},                                   //fixme:validator
    phone:    {type: String, required: true},                                   //fixme:validator
    true_name: {type: String},                                  //真实姓名
    role:{type:String, enum:['admin','web-admin','channel-mgr','channel','member'],required:true},
    superior:{type:String},                                         //所属上级ID
    wechat_id:{type:String},                                    //微信ID
    job_number:{type:String, unique: true} ,                                         //工号


    create_on: {type: Number},                 //创建时间
    modify_on: {type: Number},                                    //修改时间
    enabled:  {type: Boolean, default: true}                    //账号禁用开关
});


var CustomerSchema = new Schema({
    id:       {type: String, unique: true, required: true},
    name: {type: String, required: true},                                  //真实姓名
    
    email:    {type: String},                                   //fixme:validator
    phone:    {type: String, required: true},                                   //fixme:validator
    
    belong_mem:{type:String},                                         //所属会员user id
    belong_channel:{type:String},                                    //所属渠道user id

    apply_amount:{type:Number},                                 //申请金额
    finished_amount:{type:Number},                              //已放款金额

    finished_date:{type:Number},                                //放款日期
    billing_date: {type:Number},                                //还款日期

    server_rate:{type:Number},                                  //服务费率
    comment: {type:String},                                         //备注信息         

    territory:{type:String},                                    //所属地域                   
    status:{type:String, enum:['init', 'handled','finished'],default:'init'},   //处理状态

    create_on: {type: Number},                              //申请提交时间
    modify_on: {type: Number},                                    //修改时间
});


modelObj.AccountModel = mongoose.model('websvr.accounts', AccountSchema);
