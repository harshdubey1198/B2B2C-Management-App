const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    name: { type: String },
    contactPerson: { type: String },
    phone: { type: String },
    email: { type: String },
    address: {
        h_no: { type: String },
        city: { type: String },
        state: { type: String },
        zip_code: { type: String },
        country: { type: String },
        nearby: { type: String }
    },
    firmId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deleted_at: { type: Date, default: null }
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;
