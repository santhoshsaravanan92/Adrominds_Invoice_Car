const {
    validateRequest,
    validateHeader
} = require('../helpers/helper-methods');
const {
    addInvoice
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
                message: 'Invoice added'
            });
        else
            return res.status(400).json({
                message: 'Invoice not created'
            });
    });
}