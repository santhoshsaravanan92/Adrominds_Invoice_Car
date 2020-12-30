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
    console.log('from model');
    console.log(filterData);

    const dates = filterData.FromDate.split('-')
    const date = `${dates[2]}/${dates[1]}/${dates[0]}`

    let query = `SELECT invoiceid, name, DeliveryNotes, BuyerOrderNumber, VehicleNumber, otherNotes, mode, Dated, model, km, sgst, csgt, discount, discount_option, amount, amountwithdiscount FROM invoice where Dated `;

    if (filterData.ToDate != "" && filterData.ToDate != null) {
        const date = filterData.ToDate.split('-')
        const toDate = `${date[2]}/${date[1]}/${date[0]}`
        query += ` between '${date}' and '${toDate}'`;
    } else {
        query += `= '${date}'`
    }

    if (filterData.Name != "" && filterData.Name != null) query += ` and name = '${filterData.Name.Name}'`
    if (filterData.VehicleNumber != "" && filterData.VehicleNumber != null) query += ` and VehicleNumber = '${filterData.VehicleNumber}'`;
    if (filterData.Model != "" && filterData.Model != null) query += ` and model = '${filterData.Model}'`

    return sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(result => {
        return result;
    });
};