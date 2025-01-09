const Payment = require("../schemas/payment.schema");

const validateUserSubscription = async (clientAdmin, userRole) => {
    const latestPayment = await Payment.findOne({ userId: clientAdmin._id, status: 'completed' }).sort({ paymentDate: -1 });

    if (!latestPayment) {
        throw new Error(
            userRole === 'client_admin'
                ? "No active subscription found. Please purchase or renew a plan to continue."
                : "Your account cannot be accessed due to an inactive subscription. Please contact your Client Admin."
        );
    }

    if (new Date() > new Date(latestPayment.expirationDate)) {
        clientAdmin.isActive = false;
        latestPayment.status = "expired";
        await Promise.all([clientAdmin.save(), latestPayment.save()]);

        throw new Error(
            userRole === 'client_admin'
                ? "Your subscription has expired. Please renew your plan to continue."
                : "Your account cannot be accessed at the moment. Please contact your Client Admin."
        );
    }
};

module.exports = validateUserSubscription
