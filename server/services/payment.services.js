let paymentService = {}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const Payment = require('../schemas/payment.schema');
const Plan = require('../schemas/plans.schema');
const User = require('../schemas/user.schema')

paymentService.createPayment = async (body) => {
    try {
        const {userId, amount, planId} = body
        const user = await User.findOne({_id: userId})
        if(!user){
            return Promise.reject({messages: "You are not register to buy this plan"})
        }

        if(user.planId && user.planId.toString() === planId){
            return Promise.reject({message: "You have already Purchased this Plan"})
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

// Create Checkout Session
paymentService.createCheckoutSession = async (body) => {
    try {
        const { email, planId } = body;
        const user = await User.findOne({email});
        if (!user) throw new Error("User not found");
        const plan = await Plan.findById(planId);
        if (!plan) throw new Error("Invalid Plan ID");

        // ✅ Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: user.email,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: { name: plan.title, description: plan.caption },
                    unit_amount: plan.price * 100,
                },
                quantity: 1
            }],
            success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-failure`,
            metadata: { userId: user._id.toString(), planId }
        });

        return { checkoutUrl: session.url };
    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw new Error("Could not create checkout session");
    }
};

//Webhook: Confirm Payment & Activate User
// paymentService.handleWebhook = async (req) => {
//     const sig = req.headers['stripe-signature'];

//     try {
//         const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;
//             const { userId, planId } = session.metadata;

//             let user = await User.findById(userId);
//             if (!user) throw new Error("User not found");

//             const plan = await Plan.findById(planId);
//             if (!plan) throw new Error("Plan not found");

//             const expirationDate = new Date();
//             expirationDate.setDate(expirationDate.getDate() + plan.days);

//             await Payment.create({
//                 userId: user._id,
//                 planId: plan._id,
//                 amount: plan.price,
//                 status: "completed",
//                 expirationDate
//             });

//             user.isActive = true;
//             await user.save();

//             console.log(`User ${user.email} has been automatically approved after payment.`);
//         }
//     } catch (error) {
//         console.error("Webhook error:", error);
//         throw new Error(`Webhook Error: ${error.message}`);
//     }
// };

//Verify Payment Using Session ID
paymentService.verifyPayment = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) throw new Error("Invalid session ID");

        if (session.payment_status !== "paid") {
            throw new Error("Payment not completed");
        }

        const { userId, planId } = session.metadata;
        let user = await User.findById(userId);
        if (!user) {
            // console.log("User not found in DB:", userId);
            throw new Error("User not found");
        }

        const plan = await Plan.findById(planId);
        if (!plan) {
            throw new Error("Plan not found");
        }
        
        // Calculate expiration date
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + plan.days);

        // Store Payment in DB
        const payment = await Payment.create({
            userId: user._id,
            planId: plan._id,
            amount: plan.price,
            status: "completed",
            expirationDate
        });

        // Activate User
        user.isActive = true;
        await user.save();
        return {
            status: session.payment_status,
            amount: session.amount_total / 100,
            currency: session.currency,
            customer_email: session.customer_email,
            message: "Payment verified and user activated"
        };
    } catch (error) {
        throw new Error("Payment verification failed");
    }
};

// paymentService.verifyPayment = async (sessionId) => {
//     try {
//         const session = await stripe.checkout.sessions.retrieve(sessionId);
//         if (!session) throw new Error("Invalid session ID");

//         return {
//             status: session.payment_status,
//             amount: session.amount_total / 100,
//             currency: session.currency,
//             customer_email: session.customer_email,
//         };
//     } catch (error) {
//         console.error("Error verifying payment:", error);
//         throw new Error("Payment verification failed");
//     }
// };


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

paymentService.getAllPayments = async () => {
    try {
    const payments = await Payment.find().sort({ paymentDate: 1 }); 

    if (!payments || payments.length === 0) {
        throw new Error("No payments found.")
    }
    let userPayments = {};
    payments.forEach(payment => {
        const userId = payment.userId.toString();
        if (!userPayments[userId]) {
            userPayments[userId] = {
                userId,
                totalPayments: 0,
                currentPlan: payment.plan, 
                payments: []
            };
        }

        userPayments[userId].totalPayments += 1;
        userPayments[userId].payments.push(payment);
        userPayments[userId].currentPlan = payment.plan;
    });

    const paymentSummary = Object.values(userPayments);

    return paymentSummary;
} catch (error) {
    console.error("Error fetching all payments:", error.message || error);
    throw new Error("Unable to fetch payment details.")

}
}

module.exports = paymentService