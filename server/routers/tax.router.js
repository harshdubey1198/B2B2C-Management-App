const express = require('express');
const router = express.Router();
const taxController = require('../controllers/tax.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-tax/:id',tokenVerification, taxController.createTax);
router.get('/get-taxes/:id',tokenVerification, taxController.getAllTaxes);
router.get('/get-tax/:id',tokenVerification, taxController.getTaxById);
router.put('/update-tax',tokenVerification, taxController.updateTax);
router.delete('/delete-tax/:id', tokenVerification, taxController.deleteTax);

module.exports = router;
