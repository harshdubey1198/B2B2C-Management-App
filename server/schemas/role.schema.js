const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    // permissions: {
    //   type: [String],
    //   default: [],
    // },
  },{ timestamps: true }
);

const Role = mongoose.model('Role', roleSchema);
module.exports = Role