const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const invoiceController = require('../controllers/invoice.controller')

// Create a new Inventory Item
router.post('/create-invoice', tokenVerification, invoiceController.createInvoice);
router.get('/get-invoices/:id', tokenVerification, invoiceController.getInvoices);
router.get('/get-invoice/:id', tokenVerification, invoiceController.getInvoice);
router.delete('/delete-invoice/:id', tokenVerification, invoiceController.deleteInvoice);

module.exports = router;