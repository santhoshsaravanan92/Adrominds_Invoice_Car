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
    csgt: {
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

const InvoiceProduct = sequelize.define('invoice_product', {
    Invoice_Number: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    Description: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    Rate: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
    Quantity: {
        type: Sequelize.STRING(3),
        allowNull: false,
    },
    Price: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
});

exports.addInvoice = (invoiceObj) => {
    return Invoice.create({
            InvoiceId: invoiceObj.InvoiceId,
            Name: invoiceObj.Name,
            DeliveryNotes: invoiceObj.DeliveryNotes,
            BuyerOrderNumber: invoiceObj.BuyerOrderNumber,
            VehicleNumber: invoiceObj.VehicleNumber,
            otherNotes: invoiceObj.otherNotes,
            mode: invoiceObj.mode,
            Dated: invoiceObj.Dated,
            model: invoiceObj.model,
            km: invoiceObj.km,
            sgst: invoiceObj.sgst,
            csgt: invoiceObj.cgst,
            discount: invoiceObj.discount,
            discount_option: invoiceObj.discount_option,
            amount: invoiceObj.amount,
            Email: invoiceObj.Email,
        })
        .then((a) => {
            return 'success';
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};


exports.addinvoiceproduct = (invoiceProductObj) => {
    console.log('in model')
    console.log(invoiceProductObj)
    // return InvoiceProduct.create({
    //         Invoice_Number: invoiceObj.InvoiceId,
    //         Description: invoiceObj.description,
    //         Rate: invoiceObj.rate,
    //         Quantity: invoiceObj.quantity,
    //         Price: invoiceObj.price,
    //     })
    //     .then((a) => {
    //         return 'success';
    //     })
    //     .catch((err) => {
    //         handleError(err);
    //         return err;
    //     });


    return InvoiceProduct.bulkCreate(invoiceProductObj, {
            returning: true
        })
        .then((a) => {
            return 'success';
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};