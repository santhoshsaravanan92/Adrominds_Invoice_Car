const Sequelize = require('sequelize');
const {
    sequelize
} = require('../helpers/dbhelper');
const {
    handleError
} = require('../helpers/helper-methods');

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
    console.log(customerInformation.id)
    return Customer.findOne({
            where: {
                id: customerInformation.id
            },
        })
        .then((obj) => {
            console.log('in obj model')
            if (obj) {
                console.log('record found')
                return obj.update(customerInformation);
            } else {
                return 'record not found';
            }
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};