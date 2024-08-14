const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    approvalDate: {
        type: Date,
        default: null,
    },
    validityEndDate: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan
