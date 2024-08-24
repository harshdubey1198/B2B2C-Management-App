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
        h_no: { type: String, required: true },
        nearby: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip_code: { type: String, required: true },
        country: { type: String, required: true }
    }],
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    cifNumber: { type: String, required: true },
    gstin: { type: String, required: true },
    branchName: { type: String, required: true },
    accountHolder: { type: String, required: true },

}, {timestamps: true});  

const Firms = mongoose.model('Firms', firmsSchema)

module.exports = Firms