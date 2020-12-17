const express = require('express');
const {
    check
} = require('express-validator');
const {
    addExpense,
    getallexpense,
    deleteExpense,
    getexpensebyid,
    updateExpense,getInvoiceReportsData
} = require('../controllers/expense');

const expenseRouter = express.Router();

expenseRouter.post('/addexpense', addExpense);
expenseRouter.get('/getallexpense/:email',
    [check('email', 'email should be in format').isEmail()], getallexpense);
expenseRouter.post('/deleteexpense', deleteExpense);
expenseRouter.get('/getexpensebyid/:id',
    [check('id', 'should be integer').isInt()], getexpensebyid);
expenseRouter.post('/updateexpense', updateExpense);
expenseRouter.post('/getinvoicereportsdata', getInvoiceReportsData);


module.exports = expenseRouter;