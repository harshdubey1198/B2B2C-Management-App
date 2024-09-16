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

module.exports = paymentService