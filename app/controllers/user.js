var User= require('../models/user');

//signup
exports.signup = function(req,res) {
    var _user = req.body.user;

    User.find({name: _user.name}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(user.length !== 0) {//用已有的用户名再次注册
            return res.redirect('/showSignin');
        }
        else {//未注册过的用户名
            var user = new User(_user);
            
            user.save(function(err, user) {
                if(err) {
                    console.log(err);
                }
                res.redirect('/')
            })
        }
    })
    
};

//userlist page
exports.list = function(req, res) {
    User.fetch(function(err, users) {
        if(err) {
            console.log(err);
        }
        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    })
}; 


//signin
exports.signin = function(req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name: name}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(!user) {
            console.log('登录失败，用户未注册')
            return res.redirect('/showSignup');
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
                    return res.redirect('/showSignin');                    
                    console.log('signin faild password is not matched')
                }
            })
        }
    })
};

//logout
exports.logout = function(req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
};

//showSignup
exports.showSignup = function(req, res) {
    res.render('signup', {
        title: '注册页面'
    })
}

//showSignin
exports.showSignin = function(req, res) {
    res.render('signin', {
        title: '登录页面'
    })
}

//middleware for user
exports.signinRequired = function(req, res, next) {
    var user = req.session.user;
    console.log(user)
    if(typeof user === 'undefined') {
        return res.redirect('/showSignin');
    }
    next();
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user;
    console.log(user)
    
    if(user.role <= 10) {
        return res.redirect('/showSignin');
    }
    next();
}