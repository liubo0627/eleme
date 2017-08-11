var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');




var ObjectId = require('mongodb').ObjectID;  /*用于根据id查询*/

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


var HOST='';

router.use(function(req, res, next){

    //console.log(req.headers);

    HOST='http://'+req.headers.host+'/';

    next();
});

/* GET home page. */
//查询所有新闻
router.get('/', function(req, res, next) {
  DB.find('collect',{},function (err,data) {
      if(err){
          console.log(err);
          return;
      }
      res.render('admin/collect/index',{
          host:HOST,
          list:data
      })


  })

});

//添加新闻页面
router.get('/add', function(req, res, next) {
  DB.find('userinfo',{},function (err,data) {
      if(err){
          console.log(err);
          return;
      }

      DB.find('news',{},function (err1,data1) {
            if(err1){
                console.log('err1');
                return;
            }
          res.render('admin/collect/add',{
              host:HOST,
              news:data1,
              user:data
          })
      })
  })
});

//添加新闻操作
router.post('/doadd', function(req, res, next) {
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
                DB.insertOne('collect',{
                    "user_id":req.body.user_id,
                    "username":username,
                    "cate_id":news_id,
                    "title":title,
                    "news_id":req.body.news_id,
                    "add_time":time
                },function (err,data) {
                    if(err){
                        console.log(err)
                        return;
                    }
                    // alert('数据添加成功')
                    res.redirect('/admin/collect')
                })
            })
        }

    })
});



//修改新闻页面
router.get('/edit', function(req, res, next) {

    DB.find('collect',{"_id":new ObjectId(req.query.id)},function (err,data) {
     if(err){
     console.log(err);
     return;
     }

     DB.find('news',{},function (err1,data1) {
     if(err1){
     console.log('err1');
     return;
     }
     res.render('admin/collect/edit',{
     host:HOST,
     news:data1,
     user:data,
     id:req.query.id
     })
     })
     })
});
//修改新闻跳转页面
router.post('/doedit',function (req,res,next) {

    var deta=new Date();
    var time=deta.getTime();
    var username='';
    // console.log(req.body[0].user_id)
    DB.find('news',{"_id":new ObjectId(req.body.news_id)},function (err,data) {
        if(err){

        }else{
            console.log(data)
            // username=data[0].username;
            DB.updateOne('collect',{"_id":new ObjectId(req.body._id)},{
                "cate_id": data[0].cate_id,
                "title": data[0].title,
                // "username":username,
                "add_time": time
            },function (err,data) {
                if(err){
                    console.log(err)
                    return
                }
                res.redirect(HOST+"admin/collect")
            })

        }

    })

})
//修改新闻页面
router.get('/edit', function(req, res, next) {

    DB.find('collect',{'_id':new ObjectId(req.query.id)},function (err,data) {
        // console.log(data)
        res.render('admin/collect/edit',{
            host:HOST,
            list:data
        });
    })
});


//删除新闻
router.get('/delete', function(req, res, next) {
    DB.deleteMany('collect',{"_id":new ObjectId(req.query.id)},function (err,data) {
        if(err){
            console.log(err)
            return;
        }
        // res.send("<script>alert('删除操作成功')</script>")
        res.redirect(HOST+"admin/collect")
    })
});

module.exports = router;
