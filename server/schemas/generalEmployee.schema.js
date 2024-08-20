const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalEmployeeSchema = new Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  firmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firms',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://res-console.cloudinary.com/harshdubey1198/media_explorer_thumbnails/e4538e487d236764e095b75071b82209/detailed"
  },
  role: {
    type: String,
    required: true,
    enum: ['GeneralEmployee']
  },
  permissions: {
    type: Map,
    of: [String],
    default: {
      routes: [],
      apis: [],
    },
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending', 'Suspended'],
    default: 'Active',
  },
  logs: [{
    date: { type: Date, required: true },
    time: { type: String, required: true },
    page_history: [{ type: String }],
    ip_address: { type: String, required: true },
    country: { type: String, required: true }
  }],
}, { timestamps: true });

const GeneralEmployee = mongoose.model('GeneralEmployee', generalEmployeeSchema);

module.exports = GeneralEmployee;
