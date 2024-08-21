const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportExecutiveSchema = new Schema({
  email: { type: String, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, default: "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg"},
  role: { type: String, required: true, enum: ['CustomerSupportMaster'] },
  permissions: [{
    route: { type: String, required: true },
    sub_permissions: [{ type: String }]
  }],
  logs: [{
    date: { type: Date, required: true },
    time: { type: String, required: true },
    page_history: [{ type: String }],
    ip_address: { type: String, required: true },
    country: { type: String, required: true }
  }]
}, { timestamps: true });

const SupportExecutive = mongoose.model('SupportExecutive', supportExecutiveSchema);

module.exports = SupportExecutive;
