const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')
const { tokenVerification } = require('../middleware/auth.middleware');

// Create a new Inventory Item
router.post('/create-category/:id', tokenVerification, categoryController.createCategory);
router.get('/subcategories/:id', tokenVerification,categoryController.getSubcategories);
router.get('/get-categories/:id', tokenVerification, categoryController.getCategory);
router.put('/update-category/:id', tokenVerification, categoryController.updateCategory);
router.delete('/delete-category/:id', tokenVerification, categoryController.deleteCategory);

module.exports = router;
