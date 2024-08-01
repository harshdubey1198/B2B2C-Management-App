const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountantSchema = new Schema({
  cidm: { type: String, required: true },
  fid: { type: String, required: true },
  aid: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, default: "https://res-console.cloudinary.com/harshdubey1198/media_explorer_thumbnails/e4538e487d236764e095b75071b82209/detailed"},
  role: { type: String, required: true, enum: ['Accountant'] },
  permissions: [{
    route: { type: String },
    sub_permissions: [{ type: String }]
  }]
}, {timestamps: true});

const Accountant = mongoose.model('Accountant', accountantSchema);

module.exports = Accountant;
