const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firmsSchema = new Schema({
    clientAdmin : {type: mongoose.Schema.Types.ObjectId, ref: "ClientAdmin"},
    cidm: { type: String, required: true },
    fuid: { type: String, required: true },
    firmEmail: { type: String, required: true },
    firmName: { type: String, required: true },
    firmPhone: {type: String, required: true},
    firmAdmin: {type: mongoose.Schema.Types.ObjectId, ref: "FirmAdmin"},
    avatar: { type: String, default: "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg"},
    companyAddress: [{
        h_no: { type: String },
        nearby: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String, required: true },
        zip_code: { type: String },
        country: { type: String }
    }],
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    cifNumber: { type: String },
    gstin: { type: String },
    branchName: { type: String },
    accountHolder: { type: String },

}, {timestamps: true});  

const Firms = mongoose.model('Firms', firmsSchema)

module.exports = Firms