const express = require('express');
const { check } = require('express-validator');
const { getProfileInformation, updateProfile, addProfile } = require('../controllers/profile');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
	// replace null with error : if u want to throw error
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') cb(null, true);
	else cb(new Error('Only Jpeg/JPG images are supported'), false);
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images/');
	},
	filename: (req, file, cb) => {
		cb(null, req.params.email + '.jpg');
	},
});

const logoUpload = multer({ storage: storage, fileFilter: fileFilter });
const profileRouter = express.Router();

profileRouter.get(
	'/getprofileinfo',
	[check('username', 'emails must be in good format').isEmail()],
	getProfileInformation
);

profileRouter.post('/updateprofileinfo', [check('username', 'emails must be in good format').isEmail()], updateProfile);

profileRouter.post('/addprofileinfo', [check('username', 'emails must be in good format').isEmail()], addProfile);

profileRouter.post('/uploadlogo/:email', logoUpload.single('logo'), (req, res) => {
	res.json({
		message: 'File uploaded successfully',
	});
});

module.exports = profileRouter;
