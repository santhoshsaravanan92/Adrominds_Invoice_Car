const express = require('express');
const {
    check
} = require('express-validator');
const {
    getExpense,
    getInvoiceDetails
} = require('../controllers/dashboard');

const router = express.Router();

router.get(
    '/getexpensedetails/:email/:from/:to', [check('email', 'email should be in format').isEmail()], getExpense
);

router.post(
    '/getinvoicedetails/:email', [check('email', 'email should be in format').isEmail()], getInvoiceDetails
);

module.exports = router;