var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var port = process.env.PORT || 4000;//使用环境变量的端口或3000端口
var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:8081/movie',{useMongoClient:true})

app.set('views', './views/pages');//设置视图根目录
app.set('view engine', 'jade');//设置默认的模板引擎
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(serveStatic(path.join(__dirname, 'public')));//告诉express加载静态资源的路径
app.locals.moment = require('moment');
app.listen(port);//监听端口

console.log('movie started on port ' + port);

//index page
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if(err) {
			console.log(err);
		}
		res.render('index', {
			title: 'movie 首页',
			movies: movies
		})
	})
	
});

//detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id;
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		Movie.findById(id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			res.render('detail', {
				title: 'movie ' + movie.title,
				movie: movie
			})
		})
	}
	
	
});

//admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'movie 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			summary: '',
			language: ''
		}
	})
});

//admin update movie
app.get('/admin/update/:id', function(req, res) {
	var id = req.params.id;

	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'movie 后台更新页',
				movie: movie
			})
		})
	}
})

//admin post movie从后台录入页表单提交后电影数据的储存
app.post('/admin/movie/new', function(req, res) {
	var id = req.body.movie._id;	
	var movieObj = req.body.movie;//post的movie
	console.log(movieObj)
	var _movie;
	//已经存在数据库中的电影对其更新操作
	if(typeof id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			//extend方法另一个对象里新的字段替换老对象里的对应字段
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie) {
				if(err) {
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			})
		})
	}
	else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			language: movieObj.language,
			country: movieObj.country,
			summary: movieObj.summary,
			flash: movieObj.flash,
			poster: movieObj.poster,						
			year: movieObj.year
		});
		_movie.save(function(err, movie) {
			if(err) {
				console.log('save failed: ' + err);
			}
			res.redirect('/movie/' + movie.id);
		});
	}
})

//list page
app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
		if(err) {
			console.log(err);
		}
		res.render('list', {
			title: 'movie 列表页',
			movies: movies
		});
	})
}); 

//list delete movie
app.delete('/admin/list', function(req,res) {
	var id = req.query.id;
	
	if(id) {
		Movie.remove({_id: id}, function(err, movie) {
			if(err) {
				console.log(err);
			}else {
				res.json({success: 1});
			}
		})
	}
})