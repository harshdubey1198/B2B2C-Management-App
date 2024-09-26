const InvoiceServices = require('../services/invoice.services');
const { createResult } = require('../utils/utills');

const invoiceController = {};

// SEARCH CUSTOMER
invoiceController.createInvoice = async (req, res) => {
    try {
        const invoice = await InvoiceServices.createInvoice(req.body);
        return res.status(200).json(createResult("Invoices created successfully", invoice));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET INVOICES
invoiceController.getInvoices = async (req, res) => {
    try {
        const invoices = await InvoiceServices.getInvoices(req.params.id);
        return res.status(200).json(createResult("All Invoices Fetched successfully", invoices));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE INVOICE
invoiceController.getInvoice = async (req, res) => {
    try {
        const invoice = await InvoiceServices.getInvoice(req.params.id);
        return res.status(200).json(createResult("Fetch invoice data successfully", invoice));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE INVOICES
invoiceController.deleteInvoice = async (req, res) => {
    try {
        const invoice = await InvoiceServices.deleteInvoice(req.params.id);
        return res.status(200).json(createResult("Invoice deleted successfully", invoice));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = invoiceController;