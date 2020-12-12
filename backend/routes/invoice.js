const express = require('express');
const {
    check
} = require('express-validator');

const {
    addInvoice,
    addinvoiceproduct
} = require('../controllers/invoice');

const invoiceRouter = express.Router();

invoiceRouter.post('/addinvoice', addInvoice);
invoiceRouter.post('/addinvoiceproduct', addinvoiceproduct);

module.exports = invoiceRouter;