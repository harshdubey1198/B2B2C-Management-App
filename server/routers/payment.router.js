const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller')

router.post('/create-payment', paymentController.createPayment)

module.exports = router