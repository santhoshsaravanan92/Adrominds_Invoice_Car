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


exports.changeDateFormatyyyymmdd = (d) => {
	
	const splittedDate = d.split('/');
	return (splittedDate[2] + "-" + splittedDate[0] + "-" + splittedDate[1]);
};
exports.changeDateFormatmmddyyyy = (d) => {
	
	const splittedDate = d.split('/');
	if(splittedDate[0]>12)
	{
	return (splittedDate[1] + "-" + splittedDate[0] + "-" + splittedDate[2]);
	}
};