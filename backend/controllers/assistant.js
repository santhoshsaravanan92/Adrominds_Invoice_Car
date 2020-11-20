const {
	validateRequest,
	getSalt,
	validateHeader
} = require('../helpers/helper-methods');
const {
	addAssistant,
	isAssistantExist,
	getAllAssistant,
	getAssitantDetailsById,
	updateassistantdetailsbyid,
	deleteAssistant,
} = require('../models/assistant');
const {
	addNewUserAccount,
	deleteLogin
} = require('../models/login');
const {
	generatePasswordHelper
} = require('../helpers/generatepassword');

exports.add = (req, res) => {
	const {
		Password,
		MasterEmail,
		UserName
	} = req.body;

	if (!validateHeader(req)) {
		return res.status(401).json({
			error: 'UnAuthorized',
		});
	}

	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	const salt = getSalt();
	const encyPassword = generatePasswordHelper(Password, salt);
	isAssistantExist(MasterEmail, UserName).then((data) => {
		if (data === null) {
			addAssistant(req.body, encyPassword, salt).then((data) => {
				if (data === 'success') {
					addNewUserAccount(UserName, salt, encyPassword, 1).then((a) => {
						if (a === 'success') return res.status(200).json({
							message: 'assistant added'
						});
					});
				} else return res.status(200).json({
					message: 'assistant not created'
				});
			});
		} else return res.status(200).json({
			message: 'assistant already exist'
		});
	});
};

exports.getAllAssistantDetails = (req, res) => {
	getAllAssistant(req.params.email).then((result) => {
		if (result != null) {
			return res.status(200).json({
				message: result
			});
		} else return res.status(200).json({
			message: 'no assistant found'
		});
	});
};

exports.getAssistantDetailsByID = (req, res) => {
	getAssitantDetailsById(req.params.email).then((result) => {
		if (result != null) {
			return res.status(200).json({
				result
			});
		} else return res.status(200).json({
			message: 'no assistant found'
		});
	});
};

exports.updateassistantdetailsbyid = (req, res) => {
	updateassistantdetailsbyid(req.body).then((result) => {
		if (result !== 'record not found') return res.status(200).json({
			message: 'success'
		});
		else return res.status(200).json({
			message: 'cant update the assitant'
		});
	});
};

exports.deleteAssistant = (req, res) => {
	deleteAssistant(req.params.masteremail, req.params.email).then((result) => {
		if (result === 'success') {
			deleteLogin(req.params.email).then(resultData => {
				if (resultData === 'success')
					return res.status(200).json({
						message: 'success'
					});
			})
		} else return res.status(200).json({
			message: 'cant delete the assitant'
		});
	});
};