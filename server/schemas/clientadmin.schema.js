const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientAdminSchema = new Schema({
    cidm: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyMobile: { type: String },
    companyName: { type: String},
    mobile: { type: String },
    dob: { type: Date },
    address: { type: String },
    role: {type: String, required: true},
    avatar: { type: String, default: "https://res-console.cloudinary.com/harshdubey1198/media_explorer_thumbnails/e4538e487d236764e095b75071b82209/detailed"},
    status: { type: String, enum: ['accepted', 'rejected', 'requested'], default: 'requested' },
    task_assigned: {},
    permission: {}
}, { timestamps: true });

const ClientAdmin = mongoose.model('ClientAdmin', clientAdminSchema);
module.exports = ClientAdmin;
