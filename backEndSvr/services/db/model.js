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

var AdminSchema = new Schema({
    user_name: {type: String, unique: true, required: true},    //登录名
    password: {type: String, required: true},                   //密码
    channelCount:{type:Number, default:1}
});


var ProductShowSchema = new Schema({
    id: {type: String, unique: true, required: true},    //id
    title: {type: String, required: true},    //
    type: {type: String, required: true},
    money_min:{type:String},
    money_max:{type:String},
    rate_min:{type:String},
    rate_max:{type:String},
    detail:{type:String, }
});


var CaseSchem = new Schema({
    id: {type: String, unique: true, required: true},    //id
    name:{type: String},
    type:{type: String},
    amount:{type:String, required:true},
    time_limit:{type:String },
    rate:{type:String },
    date:{type:String },
    detail:{type:String}
});


var AccountSchema = new Schema({
    id: {type: String, unique: true, required: true},    //id
    user_name: {type: String, unique: true, required: true},    //登录名
    password: {type: String, required: true},                   //密码
    email:    {type: String},                                   //fixme:validator
    phone:    {type: String, required: true},                                   //fixme:validator
    true_name: {type: String, required: true},                                  //真实姓名
    role:{type:String, enum:['admin','channel-mgr','channel','member'],default:'member',required:true},
    superior:{type:String},                                         //所属上级ID
    wechat_id:{type:String, default:""},                                    //微信ID
    job_number:{type:String} ,                                         //工号
    
    total_customers:{type:Number, default:0},              //客户数
    today_customers:{type:Number, default:0},             //今日新增客户数

    total_members:{type:Number, default:0},              //会员数
    today_members:{type:Number, default:0},             //今日新增会员数

    create_on: {type: Number},                 //创建时间
    modify_on: {type: Number},                                    //修改时间
    
    complete:{type:Boolean, default:true},
    enabled:  {type: Boolean, default: true}                    //账号禁用开关
});

modelObj.AccountModel = mongoose.model('websvr.accounts', AccountSchema);
modelObj.AdminModel = mongoose.model('websvr.backend.accounts', AdminSchema);
modelObj.ProductModel = mongoose.model('websvr.products', ProductShowSchema);
modelObj.CaseModel = mongoose.model('websvr.cases', CaseSchem);