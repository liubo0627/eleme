var express = require('express');
var router = express.Router();

var DB=require('../../model/db.js');

var md5 = require('md5-node');
var fs=require('fs')


// var bodyParser = require('body-parser');
// // parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// router.use(bodyParser.json());



//引入头像上传模块插件
var multiparty = require('multiparty');



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
  //res.send('用户首页');


    //查询用户信息

    DB.find('userinfo',{},function(err,data){


        console.log(data);
        // var username=data.username;
        // var age=data.age;
        // var sex=data.sex;
        // var password=md5(req.body.password)
        if(err){


        }else{
            res.render('admin/user/index',{

                host:HOST,   /*每一个后台页面都要把host*/

                list:data

            })

        }


    })


});


router.get('/add', function(req, res, next) {
   // res.send('用户增加');

        res.render('admin/user/add',{

            host:HOST,   /*每一个后台页面都要把host*/

        })



});

//执行增加操作

router.post('/addInfo',function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir='./public/upload';  /*路径一定要存在*/
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        var username=fields.username[0];
        var age=fields.age[0];
        var face=files.face[0].path;
        var password=md5(fields.password[0])
        var sex=fields.sex[0];
        var originalFilename=files.face[0].originalFilename;
        var date=new Date();
        var add_time=date.getTime();



        if(originalFilename!='')
        {
            DB.insertOne('userinfo',{username,age,face,sex,password,add_time},function () {
                res.redirect(HOST+'admin/user')
            })
        }
        else
        {
            fs.unlink(face);//删除文件
            face=""
            DB.insertOne('userinfo',{username,age,face,sex,password,add_time},function () {
                res.redirect(HOST+'admin/user')
            })
        }

    });


    //
    // console.log(req.body);
    // var username=req.body.username;
    // var age=req.body.age;
    // var sex=req.body.sex;
    // var password=md5(req.body.password)
    // var date=new Date();
    // var add_time=date.getTime();
    // DB.insertOne('userinfo',{
    //     username,
    //     age,
    //     sex,
    //     password,
    //     add_time
    // },function () {
    //     res.redirect(HOST+'admin/user')
    // })


})

router.get('/edit', function(req, res, next) {



    var id=req.query.id;
    DB.find('userinfo',{'_id':new ObjectId(id)},function (err,result) {
        res.render('admin/user/edit',{

            host:HOST,   /*每一个后台页面都要把host*/
            list:result

        })
        // res.render('edit',result);
    })

});


//编辑
router.post('/editinfo',function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir='./public/upload';  /*路径一定要存在*/
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        var id=fields.id[0];
        var username=fields.username[0];
        var age=fields.age[0];
        var face=files.face[0].path;
        var password=md5(fields.password[0])
        var sex=fields.sex[0];
        var originalFilename=files.face[0].originalFilename;
        var date=new Date();
        var add_time=date.getTime();



        if(originalFilename!='')
        {
            DB.updateOne('userinfo',{'_id':new ObjectId(id)},{username,age,face,sex,password,add_time},function (err,data) {
                if(err){


                }else{
                    res.redirect(HOST+'admin/user')

                }
            })
        }
        else
        {
            fs.unlink(face);//删除文件


            console.log(222);
            DB.updateOne('userinfo',{'_id':new ObjectId(id)},{username,age,sex,password,add_time},function (err,data) {
                if(err){


                }else{
                    res.redirect(HOST+'admin/user')

                }
            })
        }

    });

    //
    // var id=req.body.id;
    // var username=req.body.username;
    // var age=req.body.age;
    // var sex=req.body.sex;
    // var password=md5(req.body.password)
    // var date=new Date();
    // var add_time=date.getTime();
    // DB.updateOne('userinfo',{'_id':new ObjectId(id)},{
    //     username,
    //     age,
    //     sex,
    //     password,
    //     add_time
    // },function (err,data) {
    //     if(err){
    //
    //
    //     }else{
    //         res.redirect(HOST+'admin/user')
    //
    //     }
    // })
})

router.get('/delete',function (req,res) {
    var id=req.query.id;
    DB.deleteMany('userinfo',{'_id':new ObjectId(id)},function (err,data) {
        if(err){


        }else{
            res.render('admin/user/deletsuccess',{
                host:HOST,   /*每一个后台页面都要把host*/
            });
         //   res.redirect(HOST+'admin/user')

        }
    })
})

module.exports = router;
