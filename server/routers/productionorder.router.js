const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const productionorderController = require('../controllers/productionorder.controller');

router.post('/create-productionorder', tokenVerification, productionorderController.createProductionOrder);
router.post('/get-productionorders', productionorderController.getProductionOrders);
router.get('/get-productionorder/:id', productionorderController.getProductionOrderById);
router.put('/update-productionorder/:id', tokenVerification, productionorderController.updateProductionOrder);
router.put('/update-productionorderstatus/:id', tokenVerification, productionorderController.updateProductionOrderStatus);
router.delete('/delete-productionorder/:id', tokenVerification, productionorderController.deleteProductionOrder);

module.exports = router;
