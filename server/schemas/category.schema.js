const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: { type: String, required: true },
  description: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  firmId: { type: Schema.Types.ObjectId, ref: 'User' },
  deleted_at: { type: Date, default: null }
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
