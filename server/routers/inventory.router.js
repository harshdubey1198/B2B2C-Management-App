const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

// Create a new Inventory Item
router.post('/create-item/:id', tokenVerification, inventoryController.createItem);
router.get('/get-items/:id', inventoryController.getAllItems);
router.get('/get-item/:id', inventoryController.getItem);
router.put('/update-item/:id', tokenVerification, inventoryController.updateItem);
router.delete('/delete-item/:id', tokenVerification, inventoryController.deleteItem);
router.delete('/:itemId/delete-variant/:variantId', tokenVerification, inventoryController.deleteVariant);
router.put('/add-variant/:itemId', tokenVerification, inventoryController.addVariant);
// router.get('/getcategoryVariants/:id', tokenVerification, inventoryController.getCategoryVariants);
// router.post('/createcategoryVariants', tokenVerification, inventoryController.createCategoryVariants);

module.exports = router;
