const {
    validateRequest,
    validateHeader
} = require('../helpers/helper-methods');

const {
    getExpenseDetailsForDashboard
} = require('../models/expense');

const {
    getInvoiceDetailsForDashboard
} = require('../models/invoice');

exports.getExpense = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }
    const {
        fromDate,
        toDate
    } = req.body;
    
    getExpenseDetailsForDashboard(req.params.email, fromDate, toDate).then((data) => {
        if (data != null)
            return res.status(200).json(data);
        else
            return res.status(200).json({
                message: 'no expense found'
            });
    });
}

exports.getInvoiceDetails = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    const {
        fromDate,
        toDate
    } = req.body;

    getInvoiceDetailsForDashboard(req.params.email, fromDate, toDate).then((data) => {
        if (data != null)
            return res.status(200).json(data);
        else
            return res.status(200).json({
                message: 'no expense found'
            });
    });
}