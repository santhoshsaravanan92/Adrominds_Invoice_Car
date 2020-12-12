const express = require('express');
const {
    check
} = require('express-validator');

const {
    addInvoice
} = require('../controllers/invoice');

const invoiceRouter = express.Router();

invoiceRouter.post('/addinvoice',
    [check('Email', 'emails must be in good format').isEmail()], addInvoice);


module.exports = invoiceRouter;