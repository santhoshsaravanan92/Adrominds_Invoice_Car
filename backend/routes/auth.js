const express = require('express');
const { check } = require('express-validator');
const { signin, addAccount, forgetPassword, forgetPasswordcheck, updatePassword } = require('../controllers/auth');

const router = express.Router();

router.post(
	'/signin',
	[
		check('username', 'emails must be in good format').isEmail(),
		check('password', 'password field is required').isLength({ min: 3 }),
	],
	signin
);

router.post(
	'/addaccount',
	[
		check('email', 'emails must be in good format').isEmail(),
		check('password', 'password should be atleast 3 char length.').isLength({ min: 3 }),
		check('companyname', 'company name should not be empty').isEmpty(),
		check('name', 'name should not be empty').isEmpty(),
	],
	addAccount
);

router.post(
	'/forgetpassword',
	[
		check('username', 'emails must be in good format').isEmail(),
		check('password', 'shoould be atleast 3 char length.').isLength({ min: 3 }),
	],
	forgetPassword
);

router.post(
	'/forgetpasswordcheck',
	[check('username', 'emails must be in good format').isEmail()],
	forgetPasswordcheck
);

router.post(
	'/updatepassword',
	[
		check('username', 'emails must be in good format').isEmail(),
		check('newpassword', 'shoould be atleast 3 char length.').isLength({ min: 3 }),
		check('oldpassword', 'shoould be atleast 3 char length.').isLength({ min: 3 }),
	],
	updatePassword
);

module.exports = router;
