var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/Movie');

module.exports = function(app) {
    //pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });
    //index  
    app.get('/', Index.index);//index page

    //user
    app.post('/user/signup', User.signup);
    app.get('/admin/userlist', User.list);
    app.post('/user/signin', User.signin);
    app.get('/logout', User.logout);

    //movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie', Movie.new);
    app.get('/admin/update/:id', Movie.update)
    app.post('/admin/movie/new', Movie.save)//admin post movie从后台录入页表单提交后电影数据的储存
    app.get('/admin/list', Movie.list); 
    app.delete('/admin/list', Movie.del)
}
