const PaymentService = require('../services/payment.services')

const paymentController = {}

paymentController.createPayment = async (req, res) => {
    try {
        const  payment = await PaymentService.createPayment(req.body)
        return payment
    } catch (error) {
        console.log("error creating payment", error)
        return res.status(500).json({ message: error });
    }
}

module.exports = paymentController