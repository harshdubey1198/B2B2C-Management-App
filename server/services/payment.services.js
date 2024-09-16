let paymentService = {}
const Payment = require('../schemas/payment.schema')
const User = require('../schemas/user.schema')

paymentService.createPayment = async (body) => {
    try {
        const {userId, amount, planId} = body
        const user = await User.findById({userId})
        if(!user){
            return Promise.reject({messages: "You are not register to buy this plan"})
        }

        const payment = new Payment({
            userId: user._id,
            amount: amount,
            planId: planId,
            status: "pending"
        })

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
        const payments = await Payment.find(filters);
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

module.exports = paymentService