const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalEmployeeSchema = new Schema({
  cidm: { type: String, required: true },
  fid: { type: String, required: true },
  emp_id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, default: "https://res-console.cloudinary.com/harshdubey1198/media_explorer_thumbnails/e4538e487d236764e095b75071b82209/detailed"},
  role: { type: String, required: true, enum: ['GeneralEmployee'] },
  permissions: [{
    route: { type: String, required: true },
    sub_permissions: [{ type: String }]
  }]
}, {timestamps: true});

const GeneralEmployee = mongoose.model('GeneralEmployee', generalEmployeeSchema);

module.exports = GeneralEmployee;
