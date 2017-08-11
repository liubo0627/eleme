var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;  /*用于根据id查询*/

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


var HOST='';
router.use(function(req, res, next){

    // console.log(req.headers.host);  //req.headers.host(localhost:3000,域名和端口)

    HOST='http://'+req.headers.host+'/';

    next();
})


/* GET home page. */
router.get('/', function(req, res) {
  // res.send('新闻列表首页');
    DB.find('news_cata',{},function(err,data){


        // console.log(data);
        if(err){


        }else{
            res.render('admin/news_cata/index',{

                host:HOST,   /*每一个后台页面都要把host*/

                list:data

            })

        }


    })

});


router.get('/add', function(req, res) {
    DB.find('news_cata',{},function(err,data){


        // console.log(data[0]);
        if(err){


        }else{
            res.render('admin/news_cata/add',{

                host:HOST,   /*每一个后台页面都要把host*/

                list:data

            })

        }


    })


});
router.post('/doAdd', function(req, res) {
    // console.log(req.body); //针对post提交的所有数据

    DB.insertOne("news_cata",req.body,function (err,data) {
        if(err){
            console.log('增加失败');
            return;
        }

        //增加成功  返回到首页

        res.redirect(HOST+'admin/news_cata/');
    })
});
router.get('/edit', function(req, res) {
    var id=req.query.id;//唯一id名
    // console.log(req.query);
    DB.find('news_cata',{'_id':new ObjectId(id)},function(err,data){


        // console.log(data[0]);
        if(err){


        }else{
            res.render('admin/news_cata/edit',{

                host:HOST,   /*每一个后台页面都要把host*/

                list:data

            })

        }


    })

});
router.post('/doEdit', function(req, res) {
        var id=req.body.id;
        var cate_id=req.body.cate_id;
        var cate_name=req.body.cate_name;
        // var add_time=req.body.add_time;
        var status=req.body.status;
        var date=new Date();
        var add_time=date.getTime();
        DB.updateOne('news_cata',{'_id':new ObjectId(id)},{
            cate_id,
            cate_name,
            add_time,
            status,
        },function (err,data) {
            if(err){


            }else{
                res.redirect(HOST+'admin/news_cata')

            }
        })


});
router.get('/delete', function(req, res) {
    var id=req.query.id;
    DB.deleteMany("news_cata",{'_id':new ObjectId(id)},function (err,result) {
        if(err){
            console.log('删除失败');
            return;
        }
        console.log('删除成功');
        //res.send("<script>alert('删除数据成功');location.href='/';</script>")
        res.redirect(HOST+'admin/news_cata')

    })
});



module.exports = router;
