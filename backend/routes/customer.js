const express = require('express');
const {
	check
} = require('express-validator');
const {
	addcustomer,
	getAllCustomers,
	getCustomerById,
	updateCustomer,
	deleteCustomer
} = require('../controllers/customer');

const router = express.Router();

router.post(
	'/addcustomer', addcustomer
);

router.get(
	'/getallcustomer/:email', [
		check('email', 'emails must be in good format').isEmail()
	], getAllCustomers
);

router.get(
	'/getCustomerById/:id', [
		check('id', 'should be a valid number').isInt()
	], getCustomerById
);

router.post(
	'/updateCustomer', updateCustomer
);

router.delete(
	'/deletecustomer/:id', [
		check('id', 'should be a valid number').isInt()
	], deleteCustomer
);

module.exports = router;