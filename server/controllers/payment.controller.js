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


paymentController.getPayment = async (req, res) => {
    try {
        const payment = await PaymentService.getPayment(req.body);
        return res.status(200).json({
            message: 'Payment details fetched successfully',
            data: payment
        });
    } catch (error) {
        console.error("Error fetching payment:", error.message || error);
        return res.status(500).json({ message: 'Unable to fetch payment details' });
    }
};


module.exports = paymentController