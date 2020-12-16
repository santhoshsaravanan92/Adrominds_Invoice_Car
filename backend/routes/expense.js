const express = require('express');
const {
    check
} = require('express-validator');
const {
    addExpense,
    getallexpense,
    deleteExpense
} = require('../controllers/expense');

const expenseRouter = express.Router();

expenseRouter.post('/addexpense', addExpense);
expenseRouter.get('/getallexpense/:email',
    [check('email', 'email should be in format').isEmail()], getallexpense);
expenseRouter.post('/deleteexpense', deleteExpense);


module.exports = expenseRouter;