const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const rawMaterialsInventoryController = require('../controllers/rawinventory.controller');

router.post('/create-raw-material', tokenVerification, rawMaterialsInventoryController.createRawMaterial);
router.get('/get-raw-materials', rawMaterialsInventoryController.getRawMaterials);
router.get('/get-raw-material/:id', rawMaterialsInventoryController.getRawMaterialById);
router.put('/update-raw-material/:id', tokenVerification, rawMaterialsInventoryController.updateRawMaterial);
router.delete('/delete-raw-material/:id', tokenVerification, rawMaterialsInventoryController.deleteRawMaterial);

module.exports = router;
