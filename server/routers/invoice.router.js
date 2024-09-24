const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const invoiceController = require('../controllers/invoice.controller')

// Create a new Inventory Item
router.post('/create-invoice', tokenVerification, invoiceController.createInvoice);
// router.get('/subcategories/:id', tokenVerification,categoryController.getSubcategories);
// router.get('/get-categories/:id', tokenVerification, categoryController.getCategory);
// router.put('/update-category/:id', tokenVerification, categoryController.updateCategory);
// router.delete('/delete-category/:id', tokenVerification, categoryController.deleteCategory);

module.exports = router;
