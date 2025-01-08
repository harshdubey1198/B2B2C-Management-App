const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userName: { type: String},
  email: { type: String },
  feedbackType: { type: String, enum: ['Bug', 'Suggestion', 'Complaint', 'General'] },
  message: { type: String},
  image: { type: String },
  status: { type: String, enum: ['Pending', 'Resolved', 'In Progress'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
