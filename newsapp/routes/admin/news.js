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
  DB.find('news',{},function (err,data) {
      res.render('admin/new/index',{
          host:HOST,
          list:data
      });
  })

});

//添加新闻页面
router.get('/add', function(req, res, next) {
  res.render('admin/new/add',{
    host:HOST
  })
});

//添加新闻操作
router.post('/doadd', function(req, res, next) {
    var deta=new Date();
    var time=deta.getTime();

    var form = new multiparty.Form();
    form.uploadDir='./public/upload'  /*设置图片上传的路径*/

    form.parse(req, function(err, fields, files) {

        //fields post过来的表单的文本内容
        console.log(fields)
        console.log(files)

        //
        //files 包含吗了post过来的图片信息
        var path=files.img[0].path;   /*上传图片的一个地址*/


        DB.insertOne('news',{
            "cate_id":fields.cate_id,
            "title":fields.title,
            "img":path,
            "author":fields.author,
            "content":fields.content,
            "add_time":time
        },function (err,data) {
            if(err){
                console.log(err)
                return;
            }
            // alert('数据添加成功')
            res.redirect('/admin/news')
        })
    });
});



//修改新闻页面
router.get('/edit', function(req, res, next) {

    DB.find('news',{'_id':new ObjectId(req.query.id)},function (err,data) {
        // console.log(data)
        res.render('admin/new/edit',{
            host:HOST,
            list:data
        });
    })
});
//修改新闻跳转页面
router.post('/doedit',function (req,res,next) {
    var deta=new Date();
    var time=deta.getTime();

    var form = new multiparty.Form();
    form.uploadDir='./public/upload'  /*设置图片上传的路径*/

    form.parse(req, function(err, fields, files) {

        //fields post过来的表单的文本内容
        console.log(fields._id[0])
        // console.log(files)

        //
        //files 包含吗了post过来的图片信息
        // var path=files.img[0].path;   /*上传图片的一个地址*/

        if(files.img[0].originalFilename!=''){  /*图片存在  更新face*/
            var path=files.img[0].path;
            DB.updateOne('news',{"_id":new ObjectId(fields._id[0])},{
                "cate_id": fields.cate_id,
                "title": fields.title,
                "img": path,
                "author": fields.author,
                "content": fields.content,
                "add_time": time
            },function (err,data) {
                if(err){
                    console.log(err)
                    return
                }
                res.redirect(HOST+"admin/news")
            })
        }else{
            console.log('空');

            //执行删除它生成的没有用的文件
            DB.updateOne('news',{"_id":new ObjectId(fields._id[0])},{
                "cate_id": fields.cate_id,
                "title": fields.title,
                "author": fields.author,
                "content": fields.content,
                "add_time": time
            },function (err,data) {
                if(err){
                    console.log(err)
                    return
                }
                res.redirect(HOST+"admin/news")
            })
        }

        })
})

router.post('/doadd', function(req, res, next) {
    var deta=new Date();
    var time=deta.getTime();

    var form = new multiparty.Form();
    form.uploadDir='./public/upload'  /*设置图片上传的路径*/

    form.parse(req, function(err, fields, files) {

        //fields post过来的表单的文本内容
        console.log(fields)
        console.log(files)

        //
        //files 包含吗了post过来的图片信息
        var path=files.img[0].path;   /*上传图片的一个地址*/


        DB.insertOne('news',{
            "cate_id":fields.cate_id,
            "title":fields.title,
            "img":path,
            "author":fields.author,
            "content":fields.content,
            "add_time":time
        },function (err,data) {
            if(err){
                console.log(err)
                return;
            }
            // alert('数据添加成功')
            res.redirect('/admin/news')
        })
    });
});



//修改新闻页面
router.get('/edit', function(req, res, next) {

    DB.find('news',{'_id':new ObjectId(req.query.id)},function (err,data) {
        // console.log(data)
        res.render('admin/new/edit',{
            host:HOST,
            list:data
        });
    })
});
//修改新闻跳转页面
router.post('/upload',function (req,res,next) {
    var form = new multiparty.Form();
    form.uploadDir='./public/upload'  /*设置图片上传的路径*/

    form.parse(req, function(err, fields, files) {
        //
        //files 包含吗了post过来的图片信息
        var path=files.filedata[0].path;   /*上传图片的一个地址*/
        res.json({"err":"","msg":path})  /*给编辑器返回地址信息    图片上传成功的地址返回给编辑器*/
    })
})

//删除新闻
router.get('/delete', function(req, res, next) {
    DB.deleteMany('news',{"_id":new ObjectId(req.query.id)},function (err,data) {
        if(err){
            console.log(err)
            return;
        }
        // res.send("<script>alert('删除操作成功')</script>")
        res.redirect(HOST+"admin/news")
    })
});

module.exports = router;
