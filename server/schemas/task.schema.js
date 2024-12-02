const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Lead',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'CRMUser',
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'CRMUser',
    },
    assignDate: {
      type: Date,
      default: Date.now, 
    },
    remark: {
      type: String,
      default: null, 
    },
    remarkMessage: {
      type: String,
      default: null, 
    },
    status: {
      type: String,
      default: 'Pending', 
    },
    dueDate: {
      type: Date, 
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
