const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const customerController = require('../controllers/customer.controller')

// Create a new Inventory Item
router.get('/search', tokenVerification, customerController.searchCustomer);
router.get('/get-customers/:id', tokenVerification, customerController.getAllCustomers);
router.get('/get-customer/:id', tokenVerification, customerController.getCustomer);
router.delete('/delete-customer/:id', tokenVerification, customerController.deleteCustomer);

module.exports = router;
