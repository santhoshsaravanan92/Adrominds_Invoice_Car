const {
    validateRequest,
    validateHeader
} = require('../helpers/helper-methods');
const {
    addExpense,
    getallexpense,
    deleteExpense
} = require('../models/expense');

exports.addExpense = (req, res) => {

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

    addExpense(req.body).then((data) => {
        if (data === 'success')
            return res.status(200).json({
                message: 'expense added'
            });
        else
            return res.status(400).json({
                message: 'expense not created'
            });
    });
}

exports.getallexpense = (req, res) => {

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

    getallexpense(req.params.email).then((data) => {
        if (data)
            return res.status(200).json(data);
        else
            return res.status(400).json({
                message: 'expense not created'
            });
    });
}

exports.deleteExpense = (req, res) => {
    const {
        id
    } = req.body;
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

    deleteExpense(id).then((data) => {
        if (data === "success")
            return res.status(200).json({
                message: 'expense deleted'
            });
        else
            return res.status(200).json({
                message: 'not deleted'
            });
    });
}