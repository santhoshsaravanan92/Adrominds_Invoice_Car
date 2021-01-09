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
    getTodayDate,
    changeDateFormatyyyymmdd
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
            date: changeDateFormatyyyymmdd(expenseObj.Date),
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
        order: [
            ['date', 'ASC']
        ],
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
            date: changeDateFormatyyyymmdd(expenseObj.Date),
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
    let query = `SELECT invoiceid, name, DeliveryNotes, BuyerOrderNumber, VehicleNumber, otherNotes, mode, Dated, model, km, sgst, csgt, discount, discount_option, amount, amountwithdiscount FROM invoice `;

    if (filterData.ToDate || filterData.FromDate || filterData.Name || filterData.VehicleNumber || filterData.Model) {
        query += 'where ';
        let isConditionAdded = false;
        if (filterData.FromDate && filterData.ToDate) {
            const fromDate = changeDateFormatyyyymmdd(filterData.FromDate);
            const toDate = changeDateFormatyyyymmdd(filterData.ToDate);
            query += `dated between '${fromDate}' and '${toDate}' `;
            isConditionAdded = true;
        } else if (filterData.FromDate && !filterData.ToDate) {
            query += `dated = '${changeDateFormatyyyymmdd(filterData.FromDate)}' `;
            isConditionAdded = true;
        } else if (!filterData.FromDate && filterData.ToDate) {
            query += `dated = '${changeDateFormatyyyymmdd(filterData.ToDate)}' `;
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
    const fromDate = changeDateFormatyyyymmdd(from);
    const toDate = changeDateFormatyyyymmdd(to);
    const query = `SELECT sum(price) price, category FROM expense where owner_email = '${email}' and date BETWEEN '${fromDate}' and '${toDate}' group by category`;

    return sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(result => {
        return result;
    });
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function getToDate() {
    var date = new Date();
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        daysInMonth(date.getMonth() + 1, date.getFullYear())
    ).toLocaleDateString();
}

function getFromDate() {
    var date = new Date();
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).toLocaleDateString();
}

exports.getExpenseDetailsForFilter = (category, fromdate, todate) => {

    console.log("from model")
    console.log(category);
    console.log(fromdate);
    console.log(todate);

    isWhereAdded = false;
    let query = 'SELECT * FROM expense';
    if (category || fromdate || todate)
        query += " where"

    if (category) {
        query += " category = '" + category + "'";
        isWhereAdded = true;
    }

    if (fromdate != "") {
        if (isWhereAdded) {
            query += " and ";
        }
        query += " date between '" + changeDateFormatyyyymmdd(fromdate) + "' and '" + changeDateFormatyyyymmdd(getToDate()) + "'";
        isWhereAdded = true;
    }

    if (todate != "") {
        if (isWhereAdded) {
            query += " and ";
        }
        query += " date between '" + changeDateFormatyyyymmdd(getFromDate()) + "' and '" + changeDateFormatyyyymmdd(todate) + "'";
    }

    query += " order by date asc";


    return sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(result => {
        return result;
    });
}