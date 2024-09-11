const mongoose = require('mongoose');
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');

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
    features: {
        type: [String],
        required: true,
    },
}, { timestamps: true, paranoid: true });

// Apply the paranoid plugin at the schema level
planSchema.plugin(mongooseParanoidPlugin, { field: 'deleted_at' });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
