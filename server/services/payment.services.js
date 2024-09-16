let paymentService = {}
const Payment = require('../schemas/payment.schema')
const User = require('../schemas/user.schema')

paymentService.createPayment = async (body) => {
    try {
        const {userId, amount, planId} = body
        const user = await User.findOne({_id: userId})
        if(!user){
            return Promise.reject({messages: "You are not register to buy this plan"})
        }

        const payment = new Payment({
            userId: user._id,
            amount: amount,
            planId: planId,
            status: "pending"
        })

        // add payment gateway later to this for updating the status
        payment.status = "completed",
        await payment.save()

        if(payment.status === "completed"){
            user.planId = planId
            await user.save()
        }

        return payment
    } catch (error) {
        console.error(error);
        return Promise.reject('Error creating payments for plans.');
    }
}


paymentService.getPayment = async (filters) => {
    try {
        const payments = await Payment.find(filters).populate('userId').populate('planId');
        return {
            count: payments.length,
            data: payments,
            message: 'Payments fetched successfully'
        };
    } catch (error) {
        console.error("Error fetching payments:", error.message || error);
        throw new Error("Unable to Fetch Payments");
    }
};


paymentService.updatePayment = async (paymentId, updateData) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
        return updatedPayment;
    } catch (error) {
        console.error("Error updating payment:", error.message || error);
        throw new Error("Unable to update payment");
    }
};


paymentService.deletePayment = async (paymentId) => {
    try {
        const result = await Payment.findByIdAndDelete(paymentId);
        return result;
    } catch (error) {
        console.error("Error deleting payment:", error.message || error);
        throw new Error("Unable to delete payment");
    }
};

module.exports = paymentService