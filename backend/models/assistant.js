const {
	Sequelize,
	QueryTypes
} = require('sequelize');
const {
	sequelize
} = require('../helpers/dbhelper');
const {
	handleError
} = require('../helpers/helper-methods');
const {
	deleteLogin
} = require('./login');

const AssistantInformation = sequelize.define('AssistantInformation', {
	MasterEmail: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	UserName: {
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
	IsDashboard_read: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsDashboard_write: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsDashboard_update: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsDashboard_delete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsPlots_read: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsPlots_write: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsPlots_update: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsPlots_delete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsExecutives_read: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsExecutives_write: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsExecutives_update: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsExecutives_delete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsSales_read: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsSales_write: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsSales_update: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsSales_delete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsReports_read: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsReports_write: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsReports_update: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsReports_delete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsCustomers_read: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsCustomers_write: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsCustomers_update: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	IsCustomers_delete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
});

exports.addAssistant = (information, encyPassword, salt) => {
	return AssistantInformation.create({
			MasterEmail: information.MasterEmail,
			UserName: information.UserName,
			Password: encyPassword,
			Salt: salt,
			IsDashboard_read: information.IsDashboard_read,
			IsDashboard_write: information.IsDashboard_write,
			IsDashboard_update: information.IsDashboard_update,
			IsDashboard_delete: information.IsDashboard_delete,
			IsPlots_read: information.IsPlots_read,
			IsPlots_write: information.IsPlots_write,
			IsPlots_update: information.IsPlots_update,
			IsPlots_delete: information.IsPlots_delete,
			IsExecutives_read: information.IsExecutives_read,
			IsExecutives_write: information.IsExecutives_write,
			IsExecutives_update: information.IsExecutives_update,
			IsExecutives_delete: information.IsExecutives_delete,
			IsSales_read: information.IsSales_read,
			IsSales_write: information.IsSales_write,
			IsSales_update: information.IsSales_update,
			IsSales_delete: information.IsSales_delete,
			IsReports_read: information.IsReports_read,
			IsReports_write: information.IsReports_write,
			IsReports_update: information.IsReports_update,
			IsReports_delete: information.IsReports_delete,
			IsCustomers_read: information.IsCustomers_read,
			IsCustomers_write: information.IsCustomers_write,
			IsCustomers_update: information.IsCustomers_update,
			IsCustomers_delete: information.IsCustomers_delete,
		})
		.then((r) => {
			return 'success';
		})
		.catch((err) => {
			handleError(err);
			return err;
		});
};

exports.isAssistantExist = (masterEmail, userName) => {
	return AssistantInformation.findOne({
			where: {
				MasterEmail: masterEmail,
				UserName: userName,
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

exports.getAllAssistant = (masterEmail) => {
	return AssistantInformation.findAll({
			where: {
				MasterEmail: masterEmail,
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

exports.getAssitantDetailsById = (username) => {
	return AssistantInformation.findOne({
			where: {
				UserName: username,
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

exports.updateassistantdetailsbyid = (information) => {
	return AssistantInformation.findOne({
			where: {
				UserName: information.UserName,
				MasterEmail: information.MasterEmail
			},
		})
		.then((obj) => {
			if (obj) {
				return obj.update(information);
			} else {
				return 'record not found';
			}
		})
		.catch((err) => {
			handleError(err);
			return err;
		});
};

exports.deleteAssistant = (masterEmail, userName) => {
	//TODO: promise.all() parallel call
	//return deleteLogin(userName).then((a) => {
	// if (a === 'success') {
	//console.log("in assistant success");
	return AssistantInformation.destroy({
			where: {
				MasterEmail: masterEmail,
				UserName: userName,
			},
		})
		.then((result) => {
			console.log('in assistant success');
			return 'success';
		})
		.catch((err) => {
			handleError(err);
			return err;
		});
	// }
	// else { console.log('in login not deleted'); }
	//});
};

exports.updateAssistantPassword = (email, password, salt) => {
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

exports.getAssistantsCompany = (email) => {
	const query = "SELECT MasterEmail FROM `assistantinformation` where UserName = '" + email + "'";
	return sequelize.query(query, {
		type: QueryTypes.SELECT
	}).then(result => {
		return result[0].MasterEmail;
	});
};