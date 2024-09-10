const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg" },
    birthday: Date,
    gender: { type: String, enum: ["male", "female", "prefer not to say"], default: "prefer not to say" },
    mobile: String,
    companyTitle: { type: String },
    companyAddress: { type: String },
    companyEmail: String,
    companyMobile: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['super_admin', 'client_admin', 'firm_admin', 'accountant', 'employee'] },
    isActive: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
