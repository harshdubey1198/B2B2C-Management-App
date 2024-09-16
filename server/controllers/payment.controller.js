const PaymentService = require("../services/payment.services");

const paymentController = {};

paymentController.createPayment = async (req, res) => {
  try {
    const response = await PaymentService.createPayment(req.body);
    return res
      .status(200)
      .json({ message: "Payment Successfully created", response });
  } catch (error) {
    console.log("error creating payment", error);
    return res.status(500).json({ message: error });
  }
};

paymentController.getPayment = async (req, res) => {
  try {
    const payment = await PaymentService.getPayment(req.body);
    return res.status(200).json({
      message: "Payment details fetched successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Error fetching payment:", error.message || error);
    return res.status(500).json({ message: "Unable to fetch payment details" });
  }
};

paymentController.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id; // Assuming payment ID is passed as a URL parameter
    const updateData = req.body; // Data to update

    const updatedPayment = await PaymentService.updatePayment(
      paymentId,
      updateData
    );

    if (updatedPayment) {
      return res.status(200).json({
        message: "Payment details updated successfully",
        data: updatedPayment,
      });
    } else {
      return res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error("Error updating payment:", error.message || error);
    return res
      .status(500)
      .json({ message: "Unable to update payment details" });
  }
};


paymentController.deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.id; // Get payment ID from URL parameter

        const result = await PaymentService.deletePayment(paymentId);

        if (result) {
            return res.status(200).json({
                message: 'Payment deleted successfully',
                data: result
            });
        } else {
            return res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error("Error deleting payment:", error.message || error);
        return res.status(500).json({ message: 'Unable to delete payment' });
    }
};

module.exports = paymentController;
