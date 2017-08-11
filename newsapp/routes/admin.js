var express = require('express');
var router = express.Router();

var user = require('./admin/user');
var focus = require('./admin/focus');
var news = require('./admin/news');
var login = require('./admin/login');
var index = require('./admin/index');
var admin = require('./admin/admin');
var collect = require('./admin/collect');

var advise = require('./admin/advise');

var news_cata = require('./admin/news_cata');

var session = require("express-session");
router.use(session({   /*ע�⸴�ƴ����ʱ��Ҫ�� app*/
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// admin/user

//�м��
var HOST='';
router.use(function(req, res, next){

    //console.log(req.headers);
    HOST='http://'+req.headers.host+'/';
    next();
})



//�ж��û���û�е�¼
// router.use(function(req,res,next){
//     //�жϵ�¼û�е�¼
//     if(req.session.userinfo){  /*�Ѿ���¼*/
//         next();
//     }else{ /*û�е�¼*/
//         // console.log(req.url);  //ע�⿴·��Ȼ���ж�
//         //login
//
//         if(req.url=='/login' ||req.url=='/login/doLogin' ){
//             next();
//         }else{/*��ת����¼ҳ��*/
//             res.redirect(HOST+'admin/login');
//         }
//
//     }
//
// })



//admin/user/add

router.use('/index',index);
router.use('/user',user);

router.use('/focus',focus);

router.use('/news',news);

router.use('/login',login);

router.use('/admin',admin);

// router.use('/admin',admin);
router.use('/advise',advise);

router.use('/news_cata',news_cata);

router.use('/collect',collect);

module.exports = router;
