const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountantSchema = new Schema({
  cidm: { type: String, required: true },
  fid: { type: String, required: true },
  aid: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ['Accountant'] },
  permissions: [{
    route: { type: String },
    sub_permissions: [{ type: String }]
  }]
}, {timestamps: true});

const Accountant = mongoose.model('Accountant', accountantSchema);

module.exports = Accountant;
