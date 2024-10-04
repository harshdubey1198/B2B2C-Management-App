const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
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
    maxFirms: { type: Number },
    features: [{ type: String }],
    deleted_at: { 
        type: Date, 
        default: null 
    }
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
