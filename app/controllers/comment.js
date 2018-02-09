var Comment = require('../models/comment');

//comment
exports.save = function(req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;
    var cid = _comment.cid;
    var from = _comment.from;
    var to = _comment.tid;
    var content = _comment.content;
    if(cid) {
        Comment.findById(cid, function(err, comment) {
            var reply = {
                from: from,
                to: to,
                content: content
            }
            console.log('reply:' + comment)
            comment.reply.push(reply);
            comment.save(function(err, comment) {
                if(err) {
                    console.log('save failed: ' + err);
                }
                res.redirect('/movie/' + movieId);
            });
        })
    }
    else{
        var comment = new Comment(_comment);
        comment.save(function(err, comment) {
            if(err) {
                console.log('save failed: ' + err);
            }
            res.redirect('/movie/' + movieId);
        });
    } 
}


