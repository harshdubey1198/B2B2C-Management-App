const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },  
    paymentDate: { type: Date, default: Date.now }, 
    amount: { type: Number, required: true }, 
    status: { type: String, enum: ['pending', 'completed', 'failed', 'expired'], default: 'pending' },
    expirationDate: { type: Date, required: true }, 
}, {timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
