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
    app.get('/admin/user/list',User.signinRequired, User.adminRequired, User.list);
    app.post('/user/signin', User.signin);
    app.get('/logout', User.logout);
    app.get('/showSignin', User.showSignin);
    app.get('/showSignup', User.showSignup);

    //movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie/new',User.signinRequired, User.adminRequired, Movie.new);
    app.get('/admin/movie/update/:id',User.signinRequired, User.adminRequired, Movie.update)
    app.post('/admin/movie/new',User.signinRequired, User.adminRequired, Movie.save)//admin post movie从后台录入页表单提交后电影数据的储存
    app.get('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.list); 
    app.delete('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.del)
}
