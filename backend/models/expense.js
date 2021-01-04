const {
    Sequelize,
    QueryTypes
} = require('sequelize');
const {
    Op
} = require("sequelize");
const {
    sequelize
} = require('../helpers/dbhelper');
const {
    handleError,
    getTodayDate
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

exports.getexpensebyid = (id) => {
    return Expense.findOne({
        where: {
            id: id,
            isactive: 1,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.updateExpense = (expenseObj) => {
    return Expense.update({
            date: expenseObj.Date,
            category: expenseObj.Category,
            price: expenseObj.Price,
            notes: expenseObj.Notes,
        }, {
            where: {
                id: expenseObj.Id,
                owner_email: expenseObj.Email
            },
        })
        .then((a) => {
            return 'success';
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};

exports.getInvoiceReportsData = (filterData) => {

    console.log('in model')
    console.log(filterData)

    let query = `SELECT invoiceid, name, DeliveryNotes, BuyerOrderNumber, VehicleNumber, otherNotes, mode, Dated, model, km, sgst, csgt, discount, discount_option, amount, amountwithdiscount FROM invoice `;

    if (filterData.ToDate || filterData.FromDate || filterData.Name || filterData.VehicleNumber || filterData.Model) {
        query += 'where ';
        let isConditionAdded = false;
        if (filterData.FromDate && filterData.ToDate) {
            // const dates = filterData.FromDate.split('-');
            // const fromDate = `${dates[2]}/${dates[1]}/${dates[0]}`;
            // const date = filterData.ToDate.split('-')
            // const toDate = `${date[2]}/${date[1]}/${date[0]}`
            query += `dated between '${filterData.FromDate}' and '${filterData.ToDate}' `;
            isConditionAdded = true;
        } else if (filterData.FromDate && !filterData.ToDate) {
            // const dates = filterData.FromDate.split('-');
            // const fromDate = `${dates[2]}/${dates[1]}/${dates[0]}`;
            query += `dated = '${filterData.FromDate}' `;
            isConditionAdded = true;
        } else if (!filterData.FromDate && filterData.ToDate) {
            // const dates = filterData.ToDate.split('-');
            // const ToDate = `${dates[2]}/${dates[1]}/${dates[0]}`;
            query += `dated = '${filterData.ToDate}' `;
            isConditionAdded = true;
        }

        if (filterData.Name && isConditionAdded)
            query += ` and name = '${filterData.Name.Name}' `
        else if (filterData.Name && !isConditionAdded) {
            query += ` name = '${filterData.Name.Name}' `;
            isConditionAdded = true;
        }

        if (filterData.VehicleNumber && isConditionAdded)
            query += ` and VehicleNumber = '${filterData.VehicleNumber}' `;
        else if (filterData.VehicleNumber && !isConditionAdded) {
            query += ` VehicleNumber = '${filterData.VehicleNumber}' `;
            isConditionAdded = true;
        }

        if (filterData.Model && isConditionAdded)
            query += ` and model = '${filterData.Model}' `;
        else if (filterData.Model && !isConditionAdded) {
            query += `  model = '${filterData.Model}' `;
            isConditionAdded = true;
        }
    }

    return sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(result => {
        return result;
    });
};

exports.getExpenseDetailsForDashboard = (email, from, to) => {
    const query = `SELECT sum(price) price, category FROM expense where owner_email = '${email}' and date BETWEEN '${from}' and '${to}' group by category`;

    return sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(result => {
        return result;
    });
}