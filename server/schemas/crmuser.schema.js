const mongoose = require('mongoose');

const crmUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  avatar: {
    type: String,
    default:"https://res.cloudinary.com/harshdubey1198/image/upload/v1721475588/dummy-userImages/bqof59zlzkampcaxpws9.jpg",
  },
  isActive: { type: Boolean, default: false },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  firmId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const CRMUser = mongoose.model('CRMUser', crmUserSchema);

module.exports = CRMUser;
