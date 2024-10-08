const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-payment', tokenVerification, paymentController.createPayment)
router.get('/get-payment', tokenVerification, paymentController.getPayment);
router.put('/update-payment/:id', tokenVerification, paymentController.updatePayment);
router.delete('/delete-payment/:id', tokenVerification, paymentController.deletePayment);

module.exports = router