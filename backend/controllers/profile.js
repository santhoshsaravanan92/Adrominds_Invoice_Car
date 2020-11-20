const { validateRequest, validateHeader } = require('../helpers/helper-methods');
const { getProfile, updateProfile, addProfile } = require('../models/profile');

exports.getProfileInformation = (req, res) => {
	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	if (!validateHeader(req)) {
		return res.status(401).json({
			error: 'UnAuthorized',
		});
	}

	getProfile(req.query.username).then((data) => {
		if (!data) return res.status(404).json({ error: 'user not found.' });
		return res.status(200).json({ data });
	});
};

exports.updateProfile = (req, res) => {
	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	if (!validateHeader(req)) {
		return res.status(401).json({
			error: 'UnAuthorized',
		});
	}
	updateProfile(req.body).then((data) => {
		return res.status(200).json({ message: data });
	});
};

exports.addProfile = (req, res) => {
	const { username } = req.body;
	if (!validateRequest(req)) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	addProfile(username).then((data) => {
		if (a === 'success') {
			return res.status(200).json({ message: 'account created' });
		} else {
			return res.status(400).json({ message: 'account not created' });
		}
	});
};
