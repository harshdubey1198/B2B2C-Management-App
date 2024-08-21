const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewerSchema = new Schema({
  rid: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg"},
  role: { type: String, required: true, enum: ['Viewer'] },
  logs: [{
    date: { type: Date, required: true },
    time: { type: String, required: true },
    page_history: [{ type: String }],
    ip_address: { type: String, required: true },
    country: { type: String, required: true }
  }]
}, { timestamps: true });

const Viewer = mongoose.model('Viewer', viewerSchema);
module.exports = Viewer;
