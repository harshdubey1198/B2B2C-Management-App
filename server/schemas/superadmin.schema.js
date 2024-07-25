const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const superAdminSchema = new Schema({
    sadm: String,
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: Date
}, { timestamps: true });

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
module.exports = SuperAdmin;
