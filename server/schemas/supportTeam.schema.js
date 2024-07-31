const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportTeamSchema = new Schema({
  email: { type: String, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ['CustomerSupportMaster'] },
  permissions: [{
    route: { type: String, required: true },
    sub_permissions: [{ type: String }]
  }]
}, { timestamps: true });

const SupportTeam = mongoose.model('SupportTeam', supportTeamSchema);

module.exports = SupportTeam;
