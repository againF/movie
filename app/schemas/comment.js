var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
    movie: {type: ObjectId, ref: 'Movie'},
    from: {type:ObjectId, ref: 'User'},
    to: {type:ObjectId, ref: 'User'},
    content: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

//每次保存前都调用这个方法，根据是否为新增的数据设定创建时间
CommentSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else {
		this.meta.updateAt = Date.now();
	}
	next();
});

CommentSchema.statics = {
	//取出数据库中所有数据
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	//查找单条数据
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb);
	}
}

module.exports = CommentSchema;