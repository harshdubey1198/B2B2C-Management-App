const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://res.cloudinary.com/dixpqlscx/image/upload/v1716183744/vecteezy_account-avatar-user-business-flat-line-filled-icon-vector_13223732_ecraj9.jpg" },
    birthday: Date,
    gender: { type: String, enum: ["male", "female", "prefer not to say"], default: "prefer not to say" },
    mobile: String,
    companyTitle: { type: String },
    companyAddress: { type: String },
    companyEmail: String,
    companyMobile: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['super_admin', 'company_admin', 'firm_admin', 'user'], required: true },
    isActive: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
