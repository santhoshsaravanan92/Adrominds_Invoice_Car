const express = require('express');
const {
    check
} = require('express-validator');
const {
    getExpense,
} = require('../controllers/dashboard');

const router = express.Router();

router.get(
    '/getexpensedetails/:email/:from/:to', [check('email', 'email should be in format').isEmail()], getExpense
);

module.exports = router;