const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariantSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'InventoryItem'},  
  variantName: { type: String},   
  sku: { type: String, required: true},  
  quantityInStock: { type: Number } 
}, {timestamps: true});

const Variant = mongoose.model('Variant', VariantSchema);
module.exports = Variant;
