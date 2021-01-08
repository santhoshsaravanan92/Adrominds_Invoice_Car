const {
    validateRequest,
    validateHeader
} = require('../helpers/helper-methods');
const {
    addCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    isCustomerExists,
    getCustomerByName,
    getCustomerDetailsForFilter
} = require('../models/customer');

exports.addcustomer = (req, res) => {
    const {
        name,
        address,
        comments,
        email,
        gst,
        mobile,
        ownerEmail
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

    addCustomer(name, address, mobile, gst, email, comments, ownerEmail).then((data) => {
        if (data === 'success')
            return res.status(200).json({
                message: 'customer added'
            });
        else
            return res.status(400).json({
                message: 'customer not added'
            });
    });
}

exports.getAllCustomers = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    getAllCustomers(req.params.email).then((data) => {
        if (data != null)
            return res.status(200).json(data);
        else
            return res.status(200).json({
                message: 'no customer found'
            });
    });
}

exports.getCustomerById = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    getCustomerById(req.params.id).then((data) => {
        if (data != null)
            return res.status(200).json(data);
        else
            return res.status(200).json({
                message: 'no customer found'
            });
    });
}

exports.updateCustomer = (req, res) => {
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

    updateCustomer(req.body).then((data) => {
        if (data)
            return res.status(200).json({
                message: 'customer update'
            });
        else
            return res.status(400).json({
                message: 'customer not updated'
            });
    });
}

exports.deleteCustomer = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    deleteCustomer(req.params.id).then((data) => {
        if (data)
            return res.status(200).json({
                message: 'customer deleted'
            });
        else
            return res.status(400).json({
                message: 'customer not deleted'
            });
    });
}

exports.isCustomerExists = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    isCustomerExists(req.params.name).then((data) => {
        if (data)
            return res.status(200).json({
                message: true
            });
        else
            return res.status(200).json({
                message: false
            });
    });
}

exports.getCustomerByName = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    getCustomerByName(req.params.name).then((data) => {
        if (data)
            return res.status(200).json(data);
        else
            return res.status(200).json('not found');
    });
}

exports.getCustomerDetailsForFilter = (req, res) => {
    if (!validateHeader(req)) {
        return res.status(401).json({
            error: 'UnAuthorized',
        });
    }

    const {
        name,
        number
    } = req.body;

    getCustomerDetailsForFilter(name, number).then((data) => {
        if (data)
            return res.status(200).json(data);
        else
            return res.status(200).json('not found');
    });
}