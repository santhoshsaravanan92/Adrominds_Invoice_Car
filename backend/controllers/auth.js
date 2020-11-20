const {
	generatePasswordHelper
} = require('../helpers/generatepassword');
const {
	addNewUserAccount,
	signIn,
	forgetPassword,
	updatePassword
} = require('../models/login');
const {
	validateRequest,
	getSalt
} = require('../helpers/helper-methods');
const {
	addProfile,
	getAssistantsCompany
} = require('../models/profile');
const {
	getHeaderDetails
} = require('../models/profile');

exports.signin = (req, res) => {
	const {
		username,
		password
	} = req.body;
	const errmsg = validateRequest(req);
	if (!errmsg) {
		return res.status(422).json({
			error: errmsg,
		});
	}

	signIn(username).then((userObj) => {
		if (!userObj) return res.status(400).json({
			error: 'not registered with the application'
		});
		const encyPassword = generatePasswordHelper(password, userObj.dataValues.Salt);
		if (userObj.dataValues.Password !== encyPassword) return res.status(401).json({
			message: 'not authenticated'
		});

		const isAssistant = userObj.dataValues.is_assistant;
		const dataToEncypt = 'isassistant:' + isAssistant + ';' + 'username:' + username;
		const token = generatePasswordHelper(dataToEncypt, getSalt()) + '_' + isAssistant;

		let resp = {
			message: 'authenticated',
			token: token,
			userfield: Buffer.from(dataToEncypt).toString('base64'),
		};

		if (isAssistant) {
			getAssistantsCompany(username).then((result, err) => {
				if (err) return res.status(400).json({
					message: 'not able to sign in'
				});
				return res.status(200).json({
					...resp,
					asstCompany: Buffer.from(result[0].Company).toString('base64')
				});
			});
		} else {
			getHeaderDetails(username).then((a, err) => {
				if (err) return res.status(400).json({
					message: 'not able to sign in'
				});
				return res.status(200).json({
					...resp,
					name: Buffer.from(a.dataValues.Name).toString('base64'),
					company: Buffer.from(a.dataValues.Company).toString('base64'),
				});
			});
		}
	});
};

exports.addAccount = (req, res) => {
	const {
		email,
		password,
		companyname,
		name
	} = req.body;
	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	const salt = getSalt();
	const encyPassword = generatePasswordHelper(password, salt);

	addNewUserAccount(email, salt, encyPassword, 0).then((a) => {
		if (a !== 'success') {
			return res.status(400).json({
				message: a.errors[0].message
			});
		}

		addProfile(email, companyname, name).then((r) => {
			if (r === 'success') return res.status(200).json({
				message: 'account created'
			});
			else return res.status(400).json({
				message: r.errors[0].message
			});
		});
	});
};

exports.forgetPassword = (req, res) => {
	const {
		username,
		password
	} = req.body;
	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	signIn(username).then((userObj) => {
		if (userObj === null) {
			return res.status(400).json({
				error: 'email not registered with application'
			});
		}

		if (userObj.hasOwnProperty('type')) {
			return res.status(400).json({
				error: 'email is not valid'
			});
		} else {
			const salt = getSalt();
			const encyPassword = generatePasswordHelper(password, salt);
			forgetPassword(username, encyPassword, salt).then((a) => {
				if (a) return res.status(200).json({
					message: 'password updated'
				});
				else return res.status(400).json({
					message: 'problem updating password'
				});
			});
		}
	});
};

exports.forgetPasswordcheck = (req, res) => {
	const {
		username
	} = req.body;
	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	signIn(username).then((userObj) => {
		if (!userObj) return res.status(400).json({
			error: 'not a valid user'
		});
		return res.status(200).json({
			message: 'user found'
		});
	});
};

exports.updatePassword = (req, res) => {
	const {
		username,
		newpassword,
		oldpassword
	} = req.body;

	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	signIn(username).then((userObj) => {
		if (!userObj) return res.status(404).json({
			error: 'user not found'
		});
		const encyPassword = generatePasswordHelper(oldpassword, userObj.dataValues.Salt);
		if (encyPassword !== userObj.dataValues.Password)
			return res.status(200).json({
				message: 'old password is wrong'
			});
		const salt = getSalt();
		updatePassword(username, generatePasswordHelper(newpassword, salt), salt).then((result) => {
			return res.status(200).json({
				message: 'password updated'
			});
		});
	});
};