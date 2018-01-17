var express = require('express');
var port = process.env.PORT || 4000;//使用环境变量的端口或3000端口
var app = express();

app.set('views', './views');//设置视图根目录
app.set('view engine', 'jade');//设置默认的模板引擎
app.listen(port);//监听端口

console.log('movie started on port ' + port);

//index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'movie 首页'
	})
});

//detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: 'movie 详情页'
	})
});

//admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'movie 后台录入页'
	})
});

//list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'movie 列表页'
	})
});

