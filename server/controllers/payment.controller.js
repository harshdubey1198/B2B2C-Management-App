const PaymentService = require("../services/payment.services");
const { createResult } = require("../utils/utills");

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

paymentController.createCheckoutSession = async (req, res) => {
  try {
    const response = await PaymentService.createCheckoutSession(req.body);
    return res.status(200).json(createResult("Session created Succefully", response));
  } catch (error) {
    console.log("error creating session", error);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

paymentController.handleWebhook = async (req, res) => {
  try {
    await PaymentService.handleWebhook(req);
    return res.status(200).json(createResult("Webhook handled successfully"));
  } catch (error) {
    console.log("Webhook handling error:", error);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

paymentController.verifyPayment = async (req, res) => {
  try {
      const sessionId = req.query.session_id;
      if (!sessionId) {
        return res.status(200).json(createResult("Session ID is required"));
      }

      const paymentDetails = await PaymentService.verifyPayment(sessionId);
      return res.status(200).json(createResult("Payment verified", paymentDetails));
  } catch (error) {
      console.error("Error verifying payment:", error);
      return res.status(500).json(createResult(null, null, error.message));
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
    // const paymentId = req.params.id; // Assuming payment ID is passed as a URL parameter
    // const updateData = req.body; // Data to update

    const updatedPayment = await PaymentService.updatePayment(
        req.params.id,
        req.body
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

paymentController.getAllPayments = async (req, res) => {
  try {
    const payment = await PaymentService.getAllPayments();
    return res.status(200).json(createResult("All Payments details fetched successfully", payment));
  } catch (error) {
    console.error("Error fetching payment:", error.message || error);
    return res.status(500).json(createResult(null, null, error.message));
  }
};


paymentController.getUserPayments = async (req, res) => {
  try {
    const payment = await PaymentService.getUserPayments(req.params.id);
    return res.status(200).json(createResult("Payments details fetched successfully", payment));
  } catch (error) {
    console.error("Error fetching payment:", error.message || error);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

module.exports = paymentController;
