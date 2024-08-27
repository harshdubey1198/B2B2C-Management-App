const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountantSchema = new Schema(
  {
    aid: {
      type: String,
      required: true,
      unique: true,
    },
    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firms",
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
    password: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: { type: String, default: "accountant" },
    dob: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg"
    },
    //   permissions: {
    //       type: Map,
    //       of: [String],
    //       default: {
    //           routes: [],
    //           apis: [],
    //       },
    //   },
    permissions: {
      type: [String],
      default: [],
    },
    restrictions: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Suspended","Requested"],
      default: "Active",
    },
    logs: [
      {
        date: { type: Date, required: true },
        time: { type: String, required: true },
        page_history: [{ type: String }],
        ip_address: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Accountant = mongoose.model('Accountant', accountantSchema);

module.exports = Accountant;
