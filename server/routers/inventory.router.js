const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

// Create a new Inventory Item
router.post('/create-item/:id', tokenVerification, inventoryController.createItem);
router.get('/get-items/:id', tokenVerification, inventoryController.getAllItems);
router.get('/get-item/:id', tokenVerification, inventoryController.getItem);
router.put('/update-item/:id', tokenVerification, inventoryController.updateItem);
router.delete('/delete-item/:id', tokenVerification, inventoryController.deleteItem);
// router.get('/getcategoryVariants/:id', tokenVerification, inventoryController.getCategoryVariants);
// router.post('/createcategoryVariants', tokenVerification, inventoryController.createCategoryVariants);

module.exports = router;
