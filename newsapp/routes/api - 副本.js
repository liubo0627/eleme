var express = require('express');
var router = express.Router();
var DB=require("../model/db.js")
var bodyParser = require('body-parser');
var md5 = require('md5-node');
var ObjectId = require('mongodb').ObjectID;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/* GET home page. */
//新闻api
router.get('/news', function(req, res) {


  var page=req.query.page;

  DB.find("news",{},{
      page:page,
      pageSize:10

  },function (err,data) {
      res.jsonp(data)
  })
});

//登录api
router.get('/login', function(req, res, next) {
    // res.send('登录api');
    //console.log(req);
    var username=req.query.username;
    var password=md5(req.query.password);
    console.log(password)
    DB.find('userinfo',{username,password},function (err,result) {
        console.log(result);
        if(err)
        {
            res.jsonp({result:'登陆失败',status:0})
        }
        else
        {
            if(result.length>0)
            {
                // res.send('登陆成功')
                res.jsonp({result:result,status:1})
            }
            else
            {
                res.jsonp({result:'登陆失败',status:0})
            }

        }
        // res.jsonp(result)
    })

});

//注册api
router.get('/register', function(req, res) {
    // res.send('登录api');
    console.log(req);
    var username=req.query.username;
    var sex=req.query.sex;
    var password=md5(req.query.password);
    DB.find('userinfo',{username},function (err,result) {
        console.log(result);
        if(err)
        {
            res.jsonp({result:'注册失败',status:0})
        }
        else
        {
            if(result.length>0)
            {
                // res.send('登陆成功')
                res.jsonp({result:'注册失败',status:0})
            }
            else
            {
                var date=new Date();
                var add_time=date.getTime();

                DB.insertOne('userinfo',{username,password,sex,add_time},function (err,result) {
                    console.log(result);
                    res.jsonp({result:'注册成功',status:1})
                })
            }

        }
    })



});

//新闻列表api
router.get('/news_cata', function(req, res) {
    DB.find("news_cata",{},function (err,data) {
        res.jsonp(data);
    })
});
//用户信息api
router.get('/userinfo', function(req, res) {
    DB.find("userinfo",{},function (err,data) {
        res.jsonp(data);
    })
});

router.get('/user', function(req, res) {
    console.log(req.query.username)
    DB.find("userinfo",{"username":req.query.username},function (err,data) {
        res.jsonp({"result":data.length});
    })
});

//返回用户id api
router.get('/userid', function(req, res) {
    console.log(req.query.username)
    DB.find("userinfo",{"username":req.query.username},function (err,data) {
        res.jsonp({"result":data[0]._id});
    })
});


//轮播图api
router.get('/focus', function(req, res) {
    DB.find("focus",{},function (err,data) {
        res.jsonp(data);
    })
});
//意见反馈api
router.get('/advise', function(req, res) {
    DB.find("advise",{},function (err,data) {
        res.jsonp(data);
    })
});
//意见反馈增加操作api
router.post('/advise/add', function(req, res) {

    var deta=new Date();
    var time=deta.getTime();
    DB.insertOne('advise',{
        "username": req.body.username,
        "content":req.body.content,
        "status":"未处理",
        "title":req.body.title,
        "add_time":time
    },function (err,data) {
        if(err){
            res.jsonp({"status":0});
            return;
        }
        // alert('数据添加成功')
        res.jsonp({"status":1})
    })


});
//收藏api
router.get('/collect', function(req, res) {
    DB.find("collect",{},function (err,data) {
        res.jsonp(data);
    })
});


//收藏查询api
router.get('/collectfind', function(req, res) {
    var user_id=req.query.user_id;
    var news_id=req.query.news_id;
    DB.find("collect",{user_id,news_id},function (err,data) {
        if(data.length>0)
        {
            res.jsonp({status:1});
        }
        else
        {
            res.jsonp({status:0});
        }

    })
});
//收藏增加操作api
router.post('/collect/doadd', function(req, res) {
    var deta=new Date();
    var time=deta.getTime();
    var username='';
    var news_id='';
    var title='';
    console.log(req.body.user_id);
    DB.find('userinfo',{"_id":new ObjectId(req.body.user_id)},function (err,data) {
        if(err){
            console.log(111)
        }else{
            console.log(111)
            username=data[0].username;
            DB.find('news',{"_id":new ObjectId(req.body.news_id)},function (err1,data1) {
                news_id=data1[0].cate_id;
                title=data1[0].title;
                DB.insertOne('collect',{
                    "user_id":req.body.user_id,
                    "username":username,
                    "cate_id":news_id,
                    "title":title,
                    "news_id":req.body.news_id,
                    "add_time":time
                },function (err,data) {
                    if(err){
                        res.jsonp({"status":0});
                        return;
                    }
                    // alert('数据添加成功')
                    res.jsonp({"status":1});
                })
            })
        }

    })
});


//收藏删除操作api
router.post('/collect/dodelet', function(req, res) {
    var deta=new Date();
    var time=deta.getTime();
    var username='';
    var news_id='';
    var title='';
    DB.find('userinfo',{"_id":new ObjectId(req.body.user_id)},function (err,data) {
        if(err){

        }else{
            username=data[0].username;
            DB.find('news',{"_id":new ObjectId(req.body.news_id)},function (err1,data1) {
                news_id=data1[0].cate_id;
                title=data1[0].title;
                DB.deleteMany('collect',{
                    "user_id":req.body.user_id,
                    "username":username,
                    "cate_id":news_id,
                    "title":title,
                    "news_id":req.body.news_id,
                    "add_time":time
                },function (err,data) {
                    if(err){
                        res.jsonp({"status":0});
                        return;
                    }
                    // alert('数据添加成功')
                    res.jsonp({"status":1});
                })
            })
        }

    })
});



module.exports = router;
