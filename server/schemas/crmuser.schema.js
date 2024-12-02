const mongoose = require('mongoose');

const crmUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Role',
    },
    firmId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    },
  },{ timestamps: true }
);

const CRMUser = mongoose.model('CRMUser', crmUserSchema);
module.exports = CRMUser;
