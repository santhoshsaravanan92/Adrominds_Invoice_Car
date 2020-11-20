const Sequelize = require('sequelize');
const {
	sequelize
} = require('../helpers/dbhelper');
const {
	handleError
} = require('../helpers/helper-methods');

const Login = sequelize.define('login', {
	Email: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	Password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	Salt: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	Temp: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	is_assistant: {
		type: Sequelize.BOOLEAN,
		defaultValue: 0,
	},
});

exports.addNewUserAccount = (email, salt, passsword, isAssistant) => {
	return Login.create({
			Email: email,
			Password: passsword,
			Salt: salt,
			is_assistant: isAssistant
		})
		.then((a) => {
			return 'success';
		})
		.catch((err) => {
			console.log('from login model');
			handleError(err);
			return err;
		});
};

exports.signIn = (email) => {
	return Login.findOne({
			where: {
				Email: email,
			},
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			handleError(err);
			return {
				...err,
				type: 'error'
			};
		});
};

exports.forgetPassword = (username, password, salt) => {
	return Login.update({
			Password: password,
			Salt: salt,
		}, {
			where: {
				Email: username,
			},
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			handleError(err);
			return err;
		});
};

exports.updatePassword = (email, password, salt) => {
	return Login.update({
			Password: password,
			Salt: salt,
		}, {
			where: {
				Email: email,
			},
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			handleError(err);
			return err;
		});
};

exports.deleteLogin = (email) => {
	return Login.destroy({
			where: {
				Email: email,
			},
		})
		.then((result) => {
			return 'success';
		})
		.catch((err) => {
			handleError(err);
			return err;
		});
};