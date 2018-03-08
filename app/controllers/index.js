var Movie = require('../models/movie');
var Category = require('../models/category');
//index page
exports.index = function(req, res) {
    Category
        .find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function(err, categories) {
            if(err) {
                console.log(err);
            }
            res.render('index', {
                title: 'movie 首页',
                categories: categories
            })
        })
};

//search page
exports.search = function(req, res) {
    var catId = req.query.cat;
    var page = parseInt(req.query.p, 10);
    var count = 2;
    var index = page * count;//每项展示数据条数
    Category
        .find({_id: catId})
        .populate({
            path: 'movies'
        })
        .exec(function(err, categories) {
            if(err) {
                console.log(err);
            }
            var category = categories[0] || {};
            var movies = category.movies || [];
            var results = movies.slice(index, index + count);
            res.render('results', {
                title: 'movie 结果列表页',
                movies: results,
                currentPage: (page + 1),
                totalPage: Math.ceil(movies.length / 2),
                query: 'cat=' + catId,
                keyword: category.name
            })
        })
};