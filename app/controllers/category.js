var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');

//admin category new page
exports.new = function(req, res) {
    res.render('category_admin', {
        title: 'category 后台录入页',
        category: {}
    })
};

//admin post category从后台录入页表单提交后电影分类数据的储存
exports.save = function(req, res) {
    var _category = req.body.category;	
    var category = new Category(_category);
    category.save(function(err, category) {
        if(err) {
            console.log('save failed: ' + err);
        }
        res.redirect('/admin/category/list');
    }); 
}

//categorylist page
exports.list = function(req, res) {
    Category.fetch(function(err, categories) {
        if(err) {
            console.log(err);
        }
        res.render('categorylist', {
            title: '电影分类列表页',
            categories: categories
        });
    })
}; 


