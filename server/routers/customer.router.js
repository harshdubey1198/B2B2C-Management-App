const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const customerController = require('../controllers/customer.controller')

// Create a new Inventory Item
router.get('/search', tokenVerification, customerController.searchCustomer);
// router.get('/subcategories/:id', tokenVerification,categoryController.getSubcategories);
// router.get('/get-categories/:id', tokenVerification, categoryController.getCategory);
// router.put('/update-category/:id', tokenVerification, categoryController.updateCategory);
// router.delete('/delete-category/:id', tokenVerification, categoryController.deleteCategory);

module.exports = router;
