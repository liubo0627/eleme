var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');
var bodyParser = require('body-parser');

var ObjectId = require('mongodb').ObjectID;  /*用于根据id查询*/

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


var HOST='';

router.use(function(req, res, next){

    //console.log(req.headers);

    HOST='http://'+req.headers.host+'/';

    next();
})

/* GET home page. */
//查询所有意见
router.get('/', function(req, res, next) {
  DB.find('advise',{},function (err,data) {
      res.render('admin/advise/index',{
          host:HOST,
          list:data
      });
  })

});

// //添加意见页面
router.get('/add', function(req, res, next) {
  res.render('admin/advise/add',{
    host:HOST
  })
});

//添加意见操作
router.post('/doadd', function(req, res, next) {
    var deta=new Date();
    var time=deta.getTime();
    DB.insertOne('advise',{
        "username": req.body.username,
        "title":req.body.title,
        "status":req.body.status,
        "content":req.body.content,
        "add_time":time
    },function (err,data) {
        if(err){
          console.log(err)
            return;
        }
        // alert('数据添加成功')
        res.redirect('/admin/advise')
    })
});




//修改新闻页面
router.get('/edit', function(req, res, next) {

    DB.find('advise',{'_id':new ObjectId(req.query.id)},function (err,data) {
        console.log(data)
        res.render('admin/advise/edit',{
            host:HOST,
            list:data
        });
    })
});
//修改意见跳转页面
router.post('/doedit',function (req,res,next) {
    var deta=new Date();
    var time=deta.getTime();
    DB.updateOne('advise',{"_id":new ObjectId(req.body._id)},{
        "title":req.body.title,
        "username":req.body.username,
        "content":req.body.content,
        "status":req.body.status,
        "add_time":time
    },function (err,data) {
        if(err){
            console.log(err)
            return
        }
        res.redirect(HOST+"admin/advise")
    })
})



//删除意见
router.get('/delete', function(req, res, next) {
    DB.deleteMany('advise',{"_id":new ObjectId(req.query.id)},function (err,data) {
        if(err){
            console.log(err)
            return;
        }
        // res.send("<script>alert('删除操作成功')</script>")
        res.redirect(HOST+"admin/advise")
    })
});

module.exports = router;
