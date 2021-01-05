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

const PersonalInformation = sequelize.define('personalinformation', {
	Name: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	Company: {
		type: Sequelize.STRING(150),
		allowNull: true,
	},
	Email: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	Mobile: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	Address: {
		type: Sequelize.STRING(500),
		allowNull: true,
	},
	GST: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	Logo: {
		type: Sequelize.STRING(100),
		allowNull: true,
	},
	Landline: {
		type: Sequelize.STRING(15),
		allowNull: true,
	},
	Website: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	AccountNumber: {
		type: Sequelize.STRING(15),
		allowNull: true,
	},
	Branchname: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	Bankname: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	Ifsc: {
		type: Sequelize.STRING(15),
		allowNull: true,
	},
});

exports.addProfile = (email, companyname, name) => {
	return PersonalInformation.create({
			Email: email,
			Company: companyname,
			Name: name
		})
		.then((r) => {
			return 'success';
		})
		.catch((err) => {
			handleError(err);
			return err;
		});
};

exports.updateProfile = (profileData) => {
	// TODO: check for Patch / patchupdate - ui
	return PersonalInformation.update({
			Name: profileData.Name,
			Company: profileData.Company,
			Mobile: profileData.Mobile,
			Address: profileData.Address,
			GST: profileData.GST,
			Landline: profileData.Landline,
			Website: profileData.Website,
			AccountNumber: profileData.AccountNumber,
			Branchname: profileData.Branchname,
			Bankname: profileData.Bankname,
			Ifsc: profileData.Ifsc,
		}, {
			where: {
				Email: profileData.Email,
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

exports.getProfile = (email) => {
	return PersonalInformation.findOne({
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

exports.getHeaderDetails = (email) => {
	return PersonalInformation.findOne({
			attributes: ['Company', 'Name'],
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
