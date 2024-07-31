const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalEmployeeSchema = new Schema({
  cidm: { type: String, required: true },
  fid: { type: String, required: true },
  emp_id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ['GeneralEmployee'] },
  permissions: [{
    route: { type: String, required: true },
    sub_permissions: [{ type: String }]
  }]
}, {timestamps: true});

const GeneralEmployee = mongoose.model('GeneralEmployee', generalEmployeeSchema);

module.exports = GeneralEmployee;
