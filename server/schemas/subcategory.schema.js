const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  subcategoryName: { type: String},
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category',} 
}, { timestamps: true });

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);
module.exports = Subcategory;
