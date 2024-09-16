const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller')

router.post('/create-payment', paymentController.createPayment)
router.get('/get-payment', paymentController.getPayment);


module.exports = router