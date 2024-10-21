const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-vendor/:id', tokenVerification, vendorController.createVendor);
router.get('/get-vendors/:id', tokenVerification, vendorController.getVendors);
router.get('/get-vendor/:id', tokenVerification, vendorController.getVendor);
router.put('/update-vendor/:id', tokenVerification, vendorController.updateVendor);
router.delete('/delete-vendor/:id', tokenVerification, vendorController.deleteVendor);

module.exports = router;
