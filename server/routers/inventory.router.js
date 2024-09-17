const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

// Create a new Inventory Item
router.post('/create-item', tokenVerification, inventoryController.createItem);
router.get('/get-items', tokenVerification, inventoryController.getItems);
router.put('/update-item/:id', tokenVerification, inventoryController.updateItem);
router.delete('/delete-item/:id', tokenVerification, inventoryController.deleteItem);

module.exports = router;
