var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var DB=require('../../model/db.js');
var md5 = require('md5-node');


var session = require("express-session");

router.use(session({   /*注意复制代码的时候要改 app*/
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));






var HOST='';

router.use(function(req, res, next){

    //console.log(req.headers);

    HOST='http://'+req.headers.host+'/';

    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.send('用户登录页面');

    res.render('admin/login',{
        host:HOST
    });
});

router.post('/doLogin', function(req, res, next) {
    //res.send('执行登录操作');
    console.log(req.body);


    console.log(req.body);

        var username=req.body.username;

        var password=md5(req.body.password);

        DB.find('admin',{
            username,
            password
        },function(err,data){

            if(err){
                console.log('登录失败');
                return;

            }
            //console.log(data);
            if(data.length>0){

                console.log('登录成功');

                req.session.userinfo=data[0];

                res.redirect(HOST+'admin/index');  /*跳转绝对路径*/

            }else{

                console.log('登录失败');
                //  res.redirect(Config.HOST+'admin/login');  /*跳转绝对路径*/   /*注意登录失败给个提示*/

                //var loginHost=Config.HOST+'admin/login';

                res.send("<script>alert('登录失败');location.href='http://localhost:3000/admin/login'</script> ")
            }
        })





});



module.exports = router;
