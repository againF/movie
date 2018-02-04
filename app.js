var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var serveStatic = require('serve-static');
var port = process.env.PORT || 4000;//使用环境变量的端口或3000端口
var dburl = 'mongodb://127.0.0.1:8081/movie';
var app = express();
mongoose.Promise = global.Promise;
mongoose.connect(dburl,{useMongoClient:true})

app.set('views', './views/pages');//设置视图根目录
app.set('view engine', 'jade');//设置默认的模板引擎
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'movie',
	store: new mongoStore({
		url: dburl,
		collection: 'sessions'
	})
}));
app.use(serveStatic(path.join(__dirname, 'public')));//告诉express加载静态资源的路径
app.locals.moment = require('moment');
require('./config/routes')(app);
app.listen(port);//监听端口

console.log('movie started on port ' + port);

