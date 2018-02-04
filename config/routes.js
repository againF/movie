var _ = require('underscore');
var Movie = require('../models/movie');
var User= require('../models/user');
module.exports = function(app) {
    //pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        if(_user) {
            app.locals.user = _user;
        }
        return next();
    });

//index page
    app.get('/', function(req, res) {
        var _user = req.session.user;
        console.log('user in session: ');
        console.log(_user);
        
        
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

    //signup
    app.post('/user/signup', function(req,res) {
        var _user = req.body.user;

        User.find({name: _user.name}, function(err, user) {
            if(err) {
                console.log(err);
            }
            if(user.length !== 0) {//用已有的用户名再次注册
                return res.redirect('/');
            }
            else {//未注册过的用户名
                var user = new User(_user);
                
                user.save(function(err, user) {
                    if(err) {
                        console.log(err);
                    }
                    res.redirect('/admin/userlist')
                })
            }
        })
        
    });

    //userlist page
    app.get('/admin/userlist', function(req, res) {
        User.fetch(function(err, users) {
            if(err) {
                console.log(err);
            }
            res.render('userlist', {
                title: '用户列表页',
                users: users
            });
        })
    }); 


    //signin
    app.post('/user/signin', function(req, res) {
        var _user = req.body.user;
        var name = _user.name;
        var password = _user.password;
        User.findOne({name: name}, function(err, user) {
            if(err) {
                console.log(err);
            }
            if(!user) {
                console.log('登录失败，用户未注册')
                return res.redirect('/');
            }else {
                user.comparePassword(password, function(err, isMatch) {
                    if(err) {
                        console.log(err);
                    }
                    if(isMatch) {
                        console.log('signin success!')
                        req.session.user = user;
                        return res.redirect('/');
                    }else {
                        console.log('signin faild password is not matched')
                    }
                })
            }
        })
    });

    //logout
    app.get('/logout', function(req, res) {
        delete req.session.user;
        delete app.locals.user;
        res.redirect('/');
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
}
