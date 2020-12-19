const express = require('express');
const {
    check
} = require('express-validator');

const {
    addInvoice,
    addinvoiceproduct,
    getCustomerNames,
    getallinvoices,
    deleteInvoice,
    getInvoiceById,
    getInvoiceProductById,
    updateInvoice,
    updateInvoiceProducts
} = require('../controllers/invoice');

const invoiceRouter = express.Router();

invoiceRouter.post('/addinvoice', addInvoice);
invoiceRouter.post('/updateinvoice', updateInvoice);
invoiceRouter.post('/addinvoiceproduct', addinvoiceproduct);
invoiceRouter.post('/updateinvoiceproduct', updateInvoiceProducts);
invoiceRouter.get('/getallinvoices/:email',
    [check('email', 'email should be in format').isEmail()], getallinvoices);
invoiceRouter.delete('/deleteinvoice/:id', [
    check('id', 'should be a valid number').isInt()
], deleteInvoice);
invoiceRouter.get(
    '/getCustomerNames/:name', [
        check('name', 'name must be string and should not be empty.').isString()
    ], getCustomerNames
);
invoiceRouter.get('/getinvoicebyid/:id', [
    check('id', 'should be a valid number').isInt()
], getInvoiceById);

invoiceRouter.get('/getinvoiceproductbyid/:id', [
    check('id', 'should be a valid number').isInt()
], getInvoiceProductById);


module.exports = invoiceRouter;