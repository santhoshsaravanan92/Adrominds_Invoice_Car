const { Sequelize, QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const { sequelize } = require("../helpers/dbhelper");
const {
  handleError,
  getTodayDate,
  changeDateFormatyyyymmdd,
  changeDateFormatmmddyyyy,
} = require("../helpers/helper-methods");

const Expense = sequelize.define("expense", {
  dated: {
    type: Sequelize.DATEONLY,
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
  console.log("Print the date");
  console.log(expenseObj.dated);
  return Expense.create({
    //dated: changeDateFormatyyyymmdd(expenseObj.dated),
    dated: expenseObj.dated,
    category: expenseObj.category,
    price: expenseObj.price,
    notes: expenseObj.notes,
    owner_email: expenseObj.email,
  })
    .then((a) => {
      console.log("success");
      return "success";
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
    order: [["dated", "ASC"]],
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      handleError(err);
      return err;
    });
};

exports.deleteExpense = (id) => {
  return Expense.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      return "success";
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
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      handleError(err);
      return err;
    });
};

exports.updateExpense = (expenseObj) => {
  console.log("Update category");
  console.log(expenseObj.price);
  console.log(expenseObj.id);
  console.log(expenseObj.dated);
  return Expense.update(
    {
      dated: changeDateFormatmmddyyyy(expenseObj.dated),
      //dated:expenseObj.dated,
      category: expenseObj.category,
      price: expenseObj.price,
      notes: expenseObj.notes,
    },
    {
      where: {
        id: expenseObj.id,
        owner_email: expenseObj.email,
      },
    }
  )
    .then((a) => {
      return "success";
    })
    .catch((err) => {
      handleError(err);
      return err;
    });
};

exports.getInvoiceReportsData = (filterData) => {
  console.log(filterData.Name);
  let query = `SELECT invoiceid, name, DeliveryNotes, BuyerOrderNumber, VehicleNumber, otherNotes, mode, Dated, model, km, sgst, csgt, discount, discount_option, amount, amountwithdiscount FROM invoice `;

  if (
    filterData.ToDate ||
    filterData.FromDate ||
    filterData.Name ||
    filterData.VehicleNumber ||
    filterData.Model
  ) {
    query += "where ";
    let isConditionAdded = false;
    if (filterData.FromDate && filterData.ToDate) {
      const fromDate = changeDateFormatyyyymmdd(filterData.FromDate);
      const toDate = changeDateFormatyyyymmdd(filterData.ToDate);
      query += `dated between date('${fromDate}') and date('${toDate}') `;
      isConditionAdded = true;
    } else if (filterData.FromDate && !filterData.ToDate) {
      query += `dated = '${changeDateFormatyyyymmdd(filterData.FromDate)}' `;
      isConditionAdded = true;
    } else if (!filterData.FromDate && filterData.ToDate) {
      query += `dated = '${changeDateFormatyyyymmdd(filterData.ToDate)}' `;
      isConditionAdded = true;
    }

    if (filterData.Name) {
      if (filterData.Name.Name && isConditionAdded)
        query += ` and name = '${filterData.Name.Name}' `;
      else if (filterData.Name.Name && !isConditionAdded) {
        query += ` name = '${filterData.Name.Name}' `;
        isConditionAdded = true;
      }
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

  return sequelize
    .query(query, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      return result;
    });
};

exports.getExpenseDetailsForDashboard = (email, from, to) => {
  const fromDate = changeDateFormatyyyymmdd(from);
  const toDate = changeDateFormatyyyymmdd(to);
  const query = `SELECT sum(price) price, category FROM expense where owner_email = '${email}' and dated BETWEEN date('${fromDate}') and date('${toDate}') group by category`;

  return sequelize
    .query(query, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      return result;
    });
};

exports.getExpenseDetailsForFilter = (category, fromdate, todate) => {
  isWhereAdded = false;
  //let query = 'SELECT * FROM expense';
  let query = "SELECT id,dated,category,price,notes,owner_email FROM expense";
  if (category || fromdate || todate) query += " where";

  if (category) {
    query += " category = '" + category + "'";
    isWhereAdded = true;
  }

  if (fromdate != "" && todate != "") {
    if (isWhereAdded) {
      query += " and ";
    }
    query +=
      " dated between '" +
      changeDateFormatyyyymmdd(fromdate) +
      "' and '" +
      changeDateFormatyyyymmdd(todate) +
      "'";
  }
  query += " order by dated asc";

  return sequelize
    .query(query, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      return result;
    });
};
