const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true }, // Email for invoicing and notifications
    mobile: { type: String, required: true }, // Mobile number for contact
    address: {
        h_no: { type: String },
        nearby: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String, required: true },
        zip_code: { type: String },
        country: { type: String }
    },
    firmId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the firm (if needed for tracking)
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to who added the customer
    isActive: { type: Boolean, default: true }, // To manage the status of the customer
}, { timestamps: true });

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
