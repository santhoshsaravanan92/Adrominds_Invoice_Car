const Sequelize = require('sequelize');
const {
    Op
} = require("sequelize");
const {
    sequelize
} = require('../helpers/dbhelper');
const {
    handleError
} = require('../helpers/helper-methods');


const Expense = sequelize.define('expense', {
    date: {
        type: Sequelize.STRING(15),
        allowNull: true,
    },
    category: {
        type: Sequelize.STRING(25),
        allowNull: true,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
    },
    notes: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
    },
    owner_email: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
});

exports.addExpense = (expenseObj) => {
    return Expense.create({
            date: expenseObj.Date,
            category: expenseObj.Category,
            price: expenseObj.Price,
            notes: expenseObj.Notes,
            owner_email: expenseObj.Email
        })
        .then((a) => {
            return 'success';
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};

exports.getallexpense = (email) => {
    return Expense.findAll({
        where: {
            owner_email: email,
            isactive: 1,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.deleteExpense = (id) => {
    console.log('in expense model')
    console.log(id)
    return Expense.destroy({
        where: {
            id: id
        },
    })
    .then((result) => {
        return 'success';
    })
    .catch((err) => {
        handleError(err);
        return err;
    });
};