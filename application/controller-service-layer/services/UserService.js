var BaseService = require('./BaseService');
var encrypt = require('../../../application-utilities/EncryptionUtility');


UserService = function (app) {
	this.app = app;
};

UserService.prototype = new BaseService();

UserService.prototype.createUser = function (user, callback) {
	user.save(function (err, userObj) {
		//Logger.info(err,userObj)
		callback(err, userObj);
	});

}

UserService.prototype.getUser = function (email, callback) {
console.log('i am in getUser ',email);
	domain.User.findOne({
		email : email,
		deleted: false
	}, function (err, user) {

		Logger.info(err,user);
		callback(err, user);
	});
}

UserService.prototype.login = function (email, password, callback) {
console.log('i am in login ');
var ps = password;
	domain.User.findOne({
		email : email,
		deleted: false
	}, function (err, user) {

		Logger.info('err -- ',err);

		//Logger.info(user._doc);

		if(!err && user)
		{
			var salt = user._doc.salt.toString();

			console.log('salt - ',salt);

			console.log(typeof(ps))
			var pswd = encrypt(salt, ps);

			Logger.info('pswd --- ',pswd, user._doc.password)

			if(pswd == user._doc.password)
			{
				console.log('pswd matched')
				callback(err, user);
			}
			else {
						callback(true, 'password not match');
			}

		} else {
		callback(err, user);
	}
	});
}

UserService.prototype.updateUser = function (id, userObj, callback) {
	domain.User.findOneAndUpdate({
		_id: id,
		deleted: false
	}, userObj, null, function (err, user) {
		if (err) {
			callback(err, userObj);
		} else {
			domain.User.findOne({
				_id: id,
				deleted: false
			}, function (err, user) {
				callback(err, user);
			});
		}
	});
}

UserService.prototype.searchUser = function (firstName,lastName,callback) {
    var firstName = (firstName == null || firstName == "")?'.*':firstName;
	var lastName = (lastName == null || lastName == "")?'.*':lastName;
	domain.User.find({firstName:new RegExp(firstName),lastName:new RegExp(lastName)},function(err,objects){
		callback(err, objects);
	})
}

UserService.prototype.deleteUser = function (id, callback) {
	domain.User.findOne({
		_id: id
	}, function (err, user) {
		if (err) {
			callback(err, user)
		};
		user.softdelete(function (err, deletedUser) {
			callback(err, deletedUser);
		});
	});
}
module.exports = function (app) {
	return new UserService(app);
};
