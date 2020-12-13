const express = require('express');
const {
    check
} = require('express-validator');

const {
    addInvoice,
    addinvoiceproduct,
    getCustomerNames
} = require('../controllers/invoice');

const invoiceRouter = express.Router();

invoiceRouter.post('/addinvoice', addInvoice);
invoiceRouter.post('/addinvoiceproduct', addinvoiceproduct);
invoiceRouter.get(
    '/getCustomerNames/:name', [
        check('name', 'name must be string and should not be empty.').isString()
    ], getCustomerNames
);

module.exports = invoiceRouter;