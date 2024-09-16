const PaymentService = require('../services/payment.services')

const paymentController = {}

paymentController.createPayment = async (req, res) => {
    try {
        const response = await PaymentService.createPayment(req.body)
        return res.status(200).json({ message: "Payment Successfully created", response})
    } catch (error) {
        console.log("error creating payment", error)
        return res.status(500).json({ message: error });
    }
}

module.exports = paymentController