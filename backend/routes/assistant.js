const express = require('express');
const { check, validationResult } = require('express-validator');
const {
	add,
	getAllAssistantDetails,
	getAssistantDetailsByID,
	updateassistantdetailsbyid,
	deleteAssistant,
} = require('../controllers/assistant');

const router = express.Router();

router.post(
	'/add',
	[
		check('UserName', 'emails must be in good format').isEmail(),
		check('Password', 'password field is required').isLength({ min: 3 }),
		check('MasterEmail', 'emails must be in good format').isEmail(),
	],
	add
);

router.post('/update', [
	check('username', 'emails must be in good format').isEmail(),
	check('password', 'password field is required').isLength({ min: 3 }),
	check('masteremail', 'emails must be in good format').isEmail(),
]);

router.get(
	'/getallassistants/:email',
	[check('email', 'emails must be in good format').isEmail()],
	getAllAssistantDetails
);

router.get(
	'/getassistantdetailsbyid/:email',
	[check('email', 'emails must be in good format').isEmail()],
	getAssistantDetailsByID
);

router.put(
	'/updateassistantdetailsbyid/:email',
	[check('email', 'emails must be in good format').isEmail()],
	updateassistantdetailsbyid
);

router.delete(
	'/delete/:masteremail/:email',
	[check('email', 'emails must be in good format').isEmail()],
	[check('masteremail', 'emails must be in good format').isEmail()],
	deleteAssistant
);

module.exports = router;
