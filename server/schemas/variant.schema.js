const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventoryVariantSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'InventoryItem'},
  variationType: { type: String }, 
  optionLabel: { type: String}, 
  priceAdjustment: { type: Number, default: 0 }, 
  stock: { type: Number, default: 0 }, 
  sku: { type: String },
  barcode: { type: String },
}, { timestamps: true });

const InventoryVariant = mongoose.model('InventoryVariant', InventoryVariantSchema);
module.exports = InventoryVariant;
