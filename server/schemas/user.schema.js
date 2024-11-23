// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     firstName: { type: String },
//     lastName: { type: String },
//     email: { type: String },
//     password: { type: String, required: true },
//     avatar: { type: String, default: "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg" },
//     birthday: Date,
//     gender: { type: String, enum: ["male", "female", "prefer not to say"], default: "prefer not to say" },
//     mobile: String,
//     companyTitle: { type: String },
//     companyMobile: String,
//     address: [{
//         h_no: { type: String },
//         nearby: { type: String },
//         district: { type: String },
//         city: { type: String },
//         state: { type: String, required: true },
//         zip_code: { type: String },
//         country: { type: String }
//     }],
//     bankName: { type: String },
//     accountNumber: { type: String },
//     ifscCode: { type: String },
//     cifNumber: { type: String },
//     gstin: { type: String },
//     branchName: { type: String },
//     accountHolder: { type: String },
//     adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     role: { type: String, enum: ['super_admin', 'client_admin', 'firm_admin', 'accountant', 'employee' ,'firm'] },
//     otp: { type: Number },
//     otpExpiry: { type: Date },
//     isVerified: { type: Boolean, default: false },
//     isActive: { type: Boolean, default: false },
//     planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg",
    },
    birthday: { type: Date },
    gender: {
      type: String,
      enum: ["male", "female", "prefer not to say"],
      default: "prefer not to say",
    },
    mobile: { type: String },
    companyTitle: { type: String },
    companyMobile: { type: String },
    incorporationDate: { type: Date },
    // bank details
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    cifNumber: { type: String },
    gstin: { type: String },
    branchName: { type: String },
    accountHolder: { type: String },
    role: {
      type: String,
      enum: [
        "super_admin",
        "client_admin",
        "firm_admin",
        "accountant",
        "employee",
        "firm",
      ],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    address: [
      {
        h_no: { type: String },
        nearby: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String, required: true },
        zip_code: { type: String },
        country: { type: String },
      },
    ],
    firmDetails: {
      type: new Schema(
        {
          firmType: {
            type: String,
            enum: [
              "sole_proprietorship",
              "partnership",
              "llp",
              "pvt_ltd",
              "public_ltd",
              "opc",
              "huf",
              "cooperative",
              "section_8",
              "joint_venture",
            ],
            required: true,
          },
          // bankName: { type: String },
          // accountNumber: { type: String },
          // ifscCode: { type: String },
          // cifNumber: { type: String },
          // branchName: { type: String },
          // accountHolder: { type: String },
          pan: { type: String },
          gstin: { type: String },
          udyam: { type: String },
          shopAndEstablishmentLicense: { type: String },
          currentBankAccount: { type: String },
          partnershipDeed: { type: String },
          certificateOfIncorporation: { type: String },
          llpAgreement: { type: String },
          moaAndAoa: { type: String },
          tan: { type: String },
          digitalSignatureCertificate: { type: String },
          din: { type: String },
          esiAndPfRegistration: { type: String },
          cin: { type: String },
          sebiRegistration: { type: String },
          hufPan: { type: String },
          registrationCertificate: { type: String },
          "12aAnd80gRegistration": { type: String },
          jvAgreement: { type: String },
          otherBusinessSpecificLicenses: { type: String },
        },
        { _id: false }
      ),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
