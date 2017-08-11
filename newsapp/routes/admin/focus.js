var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var ObjectId = require('mongodb').ObjectID;  /*用于根据id查询*/

var DB=require('../../model/db.js');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var multiparty = require('multiparty');

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

    DB.find('focus',{},function(err,data){


        //console.log(data);
        if(err){


        }else{
            console.log(HOST);
            res.render('admin/focus/index',{

                host:HOST,   /*每一个后台页面都要把host*/

                list:data

            })

        }


    })


});

//添加轮播图
router.get('/add', function(req, res, next) {
    res.render('admin/focus/add',{
        host:HOST
    });
});

router.post('/add/doadd', function(req, res, next){
    var form = new multiparty.Form();

    form.uploadDir = './public/upload'
    /*设置图片上传的路径*/

    form.parse(req, function(err, fields, files){
        console.log("-----------------");
        console.log(fields);

        var cate_id = fields.cate_id[0];
        var title = fields.title[0];
        var img = files.img[0].path;
        console.log(img);
        var description = fields.description[0];
        var url = fields.url[0];
        var add_time = fields.add_time[0];
        console.log("-----------------");

        console.log(img);
        console.log("-----------------");
        DB.insertOne('focus', {
            "cate_id":cate_id,
            "title":title,
            "img":img,
            "description":description,
            "url":url,
            "add_time":add_time
        }, function(err, result){
            if(err){
                console.log('增加轮播图失败');
                return;
            } else {
                res.redirect('/admin/focus')
            }
        })

        // var path=files.filedata[0].path;


        // res.json({"err":"","msg":path})  /*给编辑器返回地址信息*/

    })
})


//删除轮播图
router.get('/delete', function(req, res, next) {
        var id=req.query.id
        DB.deleteMany('focus',{"_id":new ObjectId(id)},function(err,result){
            if(err){
                console.log('输出轮播图失败');
                return;
            }else {
                res.redirect('/admin/focus')
            }
        })
});


//修改轮播图
router.get('/edit', function(req, res, next) {
        var id=req.query.id;
    DB.find('focus',{'_id':new ObjectId(id)},function(err,data){


        //console.log(data);
        if(err){
            console.log('读取失败');

        }else{
            //console.log(HOST);
            console.log('读取成功');
           // console.log(data);
            res.render('admin/focus/edit',{

                host:HOST,   /*每一个后台页面都要把host*/

                list:data

            })

        }


    })
});

router.post('/edit/doedit', function(req, res, next) {

    var form = new multiparty.Form();

    form.uploadDir = './public/upload'
    /*设置图片上传的路径*/
    form.parse(req, function(err, fields, files){


        var id=fields.id[0];
        var cate_id = fields.cate_id[0];
        var title = fields.title[0];
        var img = files.img[0].path;

        var description = fields.description[0];
        var url = fields.url[0];
        var add_time = fields.add_time[0];
        console.log('-----------');
        console.log(files.img[0].originalFilename);
        if(files.img[0].originalFilename!=''){
            DB.updateOne('focus',{'_id':new ObjectId(id)}, {
                "cate_id":cate_id,
                "title":title,
                "img":img,
                "description":description,
                "url":url,
                "add_time":add_time
            }, function(err, result){
                if(err){
                    console.log('增加轮播图失败');
                    return;
                } else {
                    res.redirect('/admin/focus')
                }
            })

        }else {
            DB.updateOne('focus',{'_id':new ObjectId(id)}, {
                "cate_id":cate_id,
                "title":title,

                "description":description,
                "url":url,
                "add_time":add_time
            }, function(err, result){
                if(err){
                    console.log('增加轮播图失败');
                    return;
                } else {
                    res.redirect('/admin/focus')
                }
            })
        }


    })

});


module.exports = router;
