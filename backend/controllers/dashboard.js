const {
    validateRequest,
    validateHeader
} = require('../helpers/helper-methods');

const {
    getExpenseDetailsForDashboard
} = require('../models/expense');

exports.getExpense = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    getExpenseDetailsForDashboard(req.params.email, req.params.from, req.params.to).then((data) => {
        if (data != null)
            return res.status(200).json(data);
        else
            return res.status(200).json({
                message: 'no expense found'
            });
    });
}