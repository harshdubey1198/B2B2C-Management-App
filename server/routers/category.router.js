const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')
const { tokenVerification } = require('../middleware/auth.middleware');

// Create a new Inventory Item
router.post('/create-category', categoryController.createCategory);
// router.get('/get-items', tokenVerification, categoryController.getItems);
// router.put('/update-item/:id', tokenVerification, categoryController.updateItem);
// router.delete('/delete-item/:id', tokenVerification, categoryController.deleteItem);

module.exports = router;
