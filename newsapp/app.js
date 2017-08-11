var express = require('express');
var path = require('path');


var cookieParser = require('cookie-parser');


var index = require('./routes/index');
var admin = require('./routes/admin')
var api = require('./routes/api');

var app = express();

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
//pengff
app.use('/admin/user/public',express.static(path.join(__dirname, 'public')));
app.use('/admin/public',express.static(path.join(__dirname, 'public')));
// app.use('/public',express.static('public'));

//xiexiang
app.use('/admin/news/public',express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));

//gao
app.use('/admin/focus/public',express.static(path.join(__dirname, 'public')));

app.use('/api',api);

app.use('/admin',admin);

app.use('/', index);







app.listen(3000,'10.36.132.129');

