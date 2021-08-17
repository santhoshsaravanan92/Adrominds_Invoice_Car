const {
    validateRequest,
    validateHeader
} = require('../helpers/helper-methods');
const {
    addInvoice,
    addinvoiceproduct,
    getallinvoices,
    deleteInvoice,
    getInvoiceById,
    getInvoiceProductById,
    updateInvoice,
    deleteInvoiceProduct
} = require('../models/invoice');

const { getCustomerNames } = require('../models/customer');

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

exports.getCustomerNames = (req, res) => {
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

    getCustomerNames(req.params.name).then((data) => {
        if (data != null)
            return res.status(200).json(data);
        else
            return res.status(400).json({
                message: 'customer not found'
            });
    });
}

exports.getallinvoices = (req, res) => {

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

    getallinvoices(req.params.email).then((data) => {
        if (data)
            return res.status(200).json(data);
        else
            return res.status(400).json({
                message: 'expense not created'
            });
    });
}

exports.deleteInvoice = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    deleteInvoice(req.params.id).then((data) => {
        if (data)
            return res.status(200).json({
                message: 'deleted'
            });
        else
            return res.status(400).json({
                message: 'customer not deleted'
            });
    });
}

exports.getInvoiceById = (req, res) => {

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

    getInvoiceById(req.params.id).then((data) => {
        if (data)
            return res.status(200).json(data);
        else
            return res.status(400).json({
                message: 'not found'
            });
    });
}

exports.getInvoiceProductById = (req, res) => {

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

    getInvoiceProductById(req.params.id).then((data) => {
        if (data)
            return res.status(200).json(data);
        else
            return res.status(400).json({
                message: 'not found'
            });
    });
}

exports.updateInvoice = (req, res) => {

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

    updateInvoice(req.body).then((data) => {
        if (data === 'success')
            return res.status(200).json({
                message: 'invoice updated'
            });
        else
            return res.status(400).json({
                message: 'invoice not created'
            });
    });
}

exports.updateInvoiceProducts = (req, res) => {

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
   
    req.body.map(a => {
        deleteInvoiceProduct(a.Invoice_Number).then((data) => {
            console.log('success');
        });
    });

    addinvoiceproduct(req.body).then((data) => {
        if (data === 'success')
            return res.status(200).json({
                message: 'invoice product updated'
            });
        else
            return res.status(400).json({
                message: 'not added'
            });
    });
}