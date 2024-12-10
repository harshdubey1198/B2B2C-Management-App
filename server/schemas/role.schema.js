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
    deleted_at: { 
      type: Date, 
      default: null 
    }
  },{ timestamps: true }
);

const Role = mongoose.model('Role', roleSchema);
module.exports = Role