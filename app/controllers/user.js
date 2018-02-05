var User= require('../models/user');

//signup
exports.signup = function(req,res) {
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
};

//logout
exports.logout = function(req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
};