const Sequelize = require('sequelize');
const {
    sequelize
} = require('../helpers/dbhelper');
const {
    handleError
} = require('../helpers/helper-methods');


const Invoice = sequelize.define('invoice', {
    InvoiceId: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    DeliveryNotes: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    BuyerOrderNumber: {
        type: Sequelize.STRING(15),
        allowNull: true,
    },
    VehicleNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    otherNotes: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    mode: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
    Dated: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    km: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sgst: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cgst: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    discount_option: {
        type: Sequelize.STRING(4),
        allowNull: true,
    },
    amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
    },
    Email: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
});

exports.addInvoice = (invoiceObj) => {
    return Invoice.create({
            InvoiceId: invoiceObj.invoiceId,
            Name: invoiceObj.name,
            DeliveryNotes: invoiceObj.deliveryNotes,
            BuyerOrderNumber: invoiceObj.orderNumber,
            VehicleNumber: invoiceObj.vehicleNumber,
            otherNotes: invoiceObj.othernotes,
            mode: invoiceObj.mode,
            Dated: invoiceObj.dated,
            model: invoiceObj.model,
            km: invoiceObj.km,
            sgst: invoiceObj.sgst,
            cgst: invoiceObj.cgst,
            discount: invoiceObj.discount,
            discount_option: invoiceObj.discountOption,
            amount: invoiceObj.amount,
            Email: invoiceObj.email,
        })
        .then((a) => {
            return 'success';
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};