const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadSchema = new Schema(
  {
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    mobileNumber: {
      type: String,
      // required: true,
    },
    adId: {
      type: String,
      default: null,
    },
    adName: {
      type: String,
      default: null,
    },
    adSetId: {
      type: String,
      default: null,
    },
    campaignId: {
      type: String,
      default: null,
    },
    formId: {
      type: String,
      default: null,
    },
    formName: {
      type: String,
      default: null,
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    platform: {
      type: String,
      default: null, 
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    lastQualification: {
      type: String,
      default: null,
    },
    yearOfPassout: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      // enum : ['Invalid Request' , 'No response ','Budget Issue' , 'not interested' , 'recall'  , 'Contacted', 'False Data', 'Lost', 'Converted'],
    },
    dueDate: {
      type: Date,
      default: null,
    },
    notes: [
      {
        message: { type: String }, 
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'CRMUser' }, 
        createdAt: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: null },
        lastUpdatedAt: { type: Date, default: null}
      },
    ],
    deleted_at: { 
      type: Date, 
      default: null 
    }
  },  { timestamps: true, strict: false }
);

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;