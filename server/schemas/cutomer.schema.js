const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: {
        h_no: { type: String },
        nearby: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String, required: true },
        zip_code: { type: String },
        country: { type: String }
    },
    firmId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
    deleted_at: { type: Date, default: null } 
}, { timestamps: true });

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
