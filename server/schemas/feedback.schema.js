const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userName: { type: String},
  email: { type: String },
  feedbackType: { type: String, enum: ['Bug', 'Suggestion', 'Complaint', 'General'], required: true },
  message: { type: String, required: true },
  feedbackImage: [{ type: String }],
  status: { type: String, enum: ['Pending', 'Resolved', 'In Progress'], default: 'Pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userType: { type: String, enum: ['crmuser', 'user'], required: true }, 
  deleted_at: { type: Date, default: null }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback
