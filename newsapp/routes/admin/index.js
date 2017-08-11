var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');

var md5 = require('md5-node');

var MongoClient = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;  /*用于根据id查询*/


var HOST='';
router.use(function(req, res, next){

  //console.log(req.headers);
  HOST='http://'+req.headers.host+'/';
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('后台首页');

    DB.find('userinfo',{},function (err,data) {
        if(err)
        {
          res.send('用户列表查询失败')
        }
        else
        {
            res.render('admin/index',{

                host:HOST,
                list:data
            })
        }
    })


});

module.exports = router;
