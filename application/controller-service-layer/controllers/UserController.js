var encrypt = require('../../../application-utilities/EncryptionUtility');
module.exports = function () {

	var createUser = function (req, res, callback) {

		console.log('i am in create user');
		//callback(null,1);

		var self = this;
		var salt = uuid.v1();

		 Logger.info('User - ',req.body);
		 var usr = {
			 firstName : req.body.Username,
			 lastName : req.body.Username,
			 email : req.body.Email,
			 password : req.body.Password,
			 role : "ROLE_USER",
			 profile : req.body.profile,
			 headLine : req.body.headLine,
		 };

		 var user = new domain.User(usr);

console.log(salt)
console.log(typeof(salt));
		user.salt = salt;
		user.password = encrypt(salt, user.password);
		user.validate(function (err) {
			if (err != null || err == "undefined") {
			//	Logger.info(err.errors.stack);
				err.status = 400;
				callback(err, user);
			} else {
				self.services.userService.createUser(user,callback);
			}
		})
	}

	var login = function (req, res, callback) {
		// Logger.info(req)
		var email = req.body.Email;
		var password = req.body.Password;
		this.services.userService.login(email,password,callback);
	}

	var getUser = function (req, res, callback) {
		// Logger.info(req)
		var email = req.query.email;
		this.services.userService.getUser(email,callback);
	}

	var updateUser = function (req, res, callback) {
		var id = req.params.id;
		this.services.userService.updateUser(id,req.body.user,callback);
	}

	var deleteUser = function (req, res, callback) {
		var id = req.params.id
		this.services.userService.deleteUser(id,callback);
	}

	var searchUser = function (req, res, callback) {
		var firstName = req.query.firstName;
		var lastName = req.query.lastName;
		this.services.userService.searchUser(firstName,lastName,callback);
	}

	return {
		createUser: createUser,
		getUser: getUser,
		updateUser: updateUser,
		searchUser: searchUser,
		deleteUser: deleteUser,
		login: login
	}
};
