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
    amountwithdiscount: {
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
            Name: invoiceObj.Name.Name,
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
            amountwithdiscount: invoiceObj.amountwithdiscount,
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

exports.getallinvoices = (email) => {
    return Invoice.findAll({
        where: {
            Email: email
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.deleteInvoice = (id) => {
    return Invoice.destroy({
            where: {
                InvoiceId: id
            },
        })
        .then((result) => {
            return deleteInvoiceProduct(id);
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
};

exports.deleteInvoiceProduct = (id) => {
    return InvoiceProduct.destroy({
            where: {
                Invoice_Number: id
            },
        })
        .then((result) => {
            return 'success';
        })
        .catch((err) => {
            handleError(err);
            return err;
        });
}

exports.getInvoiceById = (id) => {
    return Invoice.findOne({
        where: {
            InvoiceId: id,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.getInvoiceProductById = (id) => {
    return InvoiceProduct.findAll({
        where: {
            Invoice_Number: id,
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        handleError(err);
        return err;
    });
};

exports.updateInvoice = (invoiceObj) => {
    return Invoice.update({
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
            amountwithdiscount: invoiceObj.amountwithdiscount,
            Email: invoiceObj.Email,
        }, {
            where: {
                InvoiceId: invoiceObj.InvoiceId,
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

// exports.updateInvoiceProducts = (invoiceProductObj) => {
//     let isUpdated = false;
//     invoiceProductObj.map(a => {
//         InvoiceProduct.destroy({
//                 where: {
//                     Invoice_Number: a.Invoice_Number
//                 },
//             })
//             .then((result) => {
//                 console.log('its success');
//                 isUpdated = true;
//             })
//             .catch((err) => {
//                 handleError(err);
//                 return err;
//             });
//     });
// };