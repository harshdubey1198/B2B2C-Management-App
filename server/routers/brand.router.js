const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-brand/:id', tokenVerification, brandController.createBrand);
router.get('/get-brands/:id', tokenVerification, brandController.getBrands);
router.get('/get-brand/:id', tokenVerification, brandController.getBrandById);
router.put('/update-brand/:id', tokenVerification, brandController.updateBrand);
router.delete('/delete-brand/:id', tokenVerification, brandController.deleteBrand);

module.exports = router;
