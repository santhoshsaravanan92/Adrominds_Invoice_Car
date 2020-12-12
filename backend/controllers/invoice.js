const {
    validateRequest,
    validateHeader
} = require('../helpers/helper-methods');
const {
    addInvoice,
    addinvoiceproduct
} = require('../models/invoice');

exports.addInvoice = (req, res) => {

    if (!validateRequest(req)) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    addInvoice(req.body).then((data) => {
        if (data === 'success')
            return res.status(200).json({
                message: 'invoice added'
            });
        else
            return res.status(400).json({
                message: 'invoice not created'
            });
    });
}

exports.addinvoiceproduct = (req, res) => {

    if (!validateRequest(req)) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    addinvoiceproduct(req.body).then((data) => {
        if (data === 'success')
            return res.status(200).json({
                message: 'invoice product added'
            });
        else
            return res.status(400).json({
                message: 'not added'
            });
    });
}