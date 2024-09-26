const InvoiceServices = require('../services/invoice.services');
const { createResult } = require('../utils/utills');

const invoiceController = {};

// SEARCH CUSTOMER
invoiceController.createInvoice = async (req, res) => {
    try {
        const customer = await InvoiceServices.createInvoice(req.body);
        return res.status(200).json(createResult("Category created successfully", customer));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET INVOICES
invoiceController.getInvoices = async (req, res) => {
    try {
        const customer = await InvoiceServices.getInvoices(req.params.id);
        return res.status(200).json(createResult("Category created successfully", customer));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};


module.exports = invoiceController;
