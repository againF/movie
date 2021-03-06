var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
	name: {
        unique: true,
        type: String
    },
	password: String,
	// 0: nomal user
	// 1: verified user
	// 2: professional user
	// >10: admin
	// >50: super admin
	role: {
		type: Number,
		default: 0
	},
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
UserSchema.pre('save', function(next) {
    var user = this;
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else {
		this.meta.updateAt = Date.now();
    }
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});


UserSchema.method({
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if(err) {
				return cb(err);
			}
			return cb(null, isMatch);
		})
	}
})  

UserSchema.statics = {
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

module.exports = UserSchema;