const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientAdminSchema = new Schema({
    cidm: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyMobile: { type: String },
    companyName: { type: String },
    mobile: { type: String },
    dob: { type: Date },
    address: { type: String },
    role: { type: String, required: true, default: 'client_admin' },
    avatar: { type: String, default: "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg" },
    status: { type: String, enum: ['Accepted', 'Rejected', 'Requested', 'Hold'], default: 'Requested' },
    firms: [{
        firmId: { type: mongoose.Schema.Types.ObjectId, ref: "Firms" },
        firmName: { type: String },
    }],
    task_assigned: {},
    permissions: [{
        route: { type: String, required: true },
        sub_permissions: [{ type: String }]
    }],
    plan: {
        planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
        status: { type: String, enum: ['requested', 'active', 'inactive', 'expired']},
        activationDate: { type: Date },  
        validityDuration: { type: Number }  
    },
    logs: [{
        date: { type: Date, required: true },
        time: { type: String, required: true },
        page_history: [{ type: String }],
        ip_address: { type: String, required: true },
        country: { type: String, required: true }
    }]
}, { timestamps: true });

const ClientAdmin = mongoose.model('ClientAdmin', clientAdminSchema);
module.exports = ClientAdmin;
