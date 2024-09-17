const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
    name: { type: String }, 
    description: { type: String },                  
    cost_price: { type: Number},    
    selling_price: { type: Number}, 
    category_id: { type: Schema.Types.ObjectId, ref: 'Category'}, 
    subcategory_id: { type: Schema.Types.ObjectId, ref: 'Subcategory' }, 
    quantity_in_stock: { type: Number }, 
    reorder_level: { type: Number }, 
    variants: [VariantSchema]     
}, {timestamps: true});

const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
module.exports = InventoryItem;
