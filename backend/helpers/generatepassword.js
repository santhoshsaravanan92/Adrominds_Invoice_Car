const crypto = require('crypto');
const { handleError } = require('./helper-methods');

exports.generatePasswordHelper = (password, salt) => {
	try {
		return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
	} catch (err) {
		handleError(err);
		return;
	}
};
