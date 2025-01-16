const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const productionorderController = require('../controllers/productionorder.controller');

router.post('/create-productionorder', tokenVerification, productionorderController.createproductionorder);
router.get('/get-productionorder', productionorderController.getproductionorders);
router.get('/get-productionorder/:id', productionorderController.getproductionorderById);
router.put('/update-productionorder/:id', tokenVerification, productionorderController.updateproductionorder);
router.put('/update-productionorderstatus/:id', tokenVerification, productionorderController.updateproductionorderStatus);
router.delete('/delete-productionorder/:id', tokenVerification, productionorderController.deleteproductionorder);

module.exports = router;
