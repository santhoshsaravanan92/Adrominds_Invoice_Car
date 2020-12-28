const {
	validationResult
} = require('express-validator');
const {
	v4: uuidv4
} = require('uuid');

exports.validateRequest = (req) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errors.array()[0].msg;
	}
	return true;
};

exports.getSalt = () => {
	return uuidv4();
};

exports.validateHeader = (req) => {
	const btoken = req.header('Authorization');
	if (btoken) {
		const ar = btoken.split(' ');
		if (ar.length >= 0 && ar[0] === 'Bearer' && ar[1] !== '') return true;
	}
	return false;
};

exports.handleError = (err) => {
	console.log(err);
};

exports.getTodayDate = () => {
	const date = new Date();
	m = date.getMonth() + 1;
	y = date.getFullYear();
	d = date.getDate();

	return `${d}/${m}/${y}`; //d + "/" + m + "/" + y;
}