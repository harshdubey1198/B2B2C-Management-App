const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller')

router.post('/create-payment', paymentController.createPayment)
router.get('/get-payment', paymentController.getPayment);
router.put('/update-payment/:id', paymentController.updatePayment);
router.delete('/delete-payment/:id', paymentController.deletePayment);



module.exports = router