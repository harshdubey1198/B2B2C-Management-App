const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');

const CategorySchema = new Schema({
  categoryName: { type: String },
  description: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' }
}, { timestamps: true, paranoid: true });

CategorySchema.plugin(mongooseParanoidPlugin, { field: 'deleted_at' });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
