const {
    Sequelize,
    QueryTypes
} = require('sequelize');
const {
    sequelize
} = require('../helpers/dbhelper');
const {
    handleError
} = require('../helpers/helper-methods');
const {
    Op
} = require("sequelize");
const Customer = sequelize.define('customer', {
    Name: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    Address: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    Mobile: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    GST: {
        type: Sequelize.STRING(15),
        allowNull: true,
    },
    Email: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    Comments: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },

    owner_email: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
});


exports.addCustomer = (name, address, mobile, gst, email, comments, ownerEmail) => {
    return Customer.create({
            Name: name,
            Address: address,
            Mobile: mobile,
            GST: gst,
            Email: email,
            Comments: comments,
            owner_email: ownerEmail
        })
        .then((a) => {
            return 'success';
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};

exports.getAllCustomers = (email) => {
    return Customer.findAll({
        where: {
            owner_email: email,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.getCustomerById = (id) => {
    return Customer.findOne({
        where: {
            id: id,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.updateCustomer = (customerInformation) => {
    return Customer.update({
            Address: customerInformation.address,
            Name: customerInformation.name,
            Comments: customerInformation.comments,
            Email: customerInformation.email,
            GST: customerInformation.gst,
            Mobile: customerInformation.mobile
        }, {
            where: {
                id: customerInformation.id
            },
        })
        .then((obj) => {
            return obj;
            // if (obj) {
            //     return obj.update(customerInformation);
            // } else {
            //     return 'record not found';
            // }
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};

exports.deleteCustomer = (id) => {
    return Customer.destroy({
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

exports.getCustomerNames = (name) => {
    return Customer.findAll({
        attributes: ['Name'],
        where: {
            Name: {
                [Op.like]: `%${name}%`
            },
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.isCustomerExists = (name) => {
    return Customer.findOne({
        where: {
            Name: name,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.getCustomerByName = (name) => {
    return Customer.findOne({
        where: {
            Name: name,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.getCustomerDetailsForFilter = (name, mobileno) => {
    isNameAdded = false;
    let query = 'SELECT id,Name,Address,Mobile,GST,Email,Comments,owner_email FROM customer';
    if (name || mobileno)
        query += " where"

    if (name) {
        query += " name = '" + name + "'"
        isNameAdded = true;
    }

    if (mobileno != 0 && isNameAdded) {
        query += " and mobile = '" + mobileno + "'"
    } else if (mobileno != 0 && !isNameAdded) query += " mobile = '" + mobileno + "'"

    query += " order by Name asc";


    return sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(result => {
        return result;
    });
}