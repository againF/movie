var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var serveStatic = require('serve-static');
var morgan = require('morgan');//HTTP request logger middleware for node.js
var port = process.env.PORT || 4000;//使用环境变量的端口或4000端口
var dburl = 'mongodb://127.0.0.1:8081/movie';
var app = express();
var fs = require('fs');
mongoose.Promise = global.Promise;
mongoose.connect(dburl,{useMongoClient:true});

//models loading
var models_path = __dirname + '/app/models';
var walk = function(path) {
	fs
		.readdirSync(path)
		.forEach(function(file) {
			var newPath = path + '/' + file;
			var stat = fs.statSync(newPath);

			if(stat.isFile()) {
				if(/(.*)\.(js|coffee)/.test(file)) {
					require(newPath);
				}
			}
			else if(stat.isDirectory()) {
				walk(newPath);
			}
		});
};
walk(models_path);
app.set('views', './app/views/pages');//设置视图根目录
app.set('view engine', 'jade');//设置默认的模板引擎
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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
//开发环境的配置
if('development' === app.get('env')) {
	app.set('showStackError', true);
	app.use(morgan(':method :url :status'));//日志打印格式
	app.locals.pretty = true;//页面的源码以不压缩的格式显示
	mongoose.set('debug', true);
}
require('./config/routes')(app);
app.listen(port);//监听端口

console.log('movie started on port ' + port);

