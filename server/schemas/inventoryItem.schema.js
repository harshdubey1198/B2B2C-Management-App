const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
    name: { type: String, required: true }, 
    description: { type: String },                  
    quantity: { type: Number }, 
    qtyType: { type: String },   
    supplier: { type: String },  
    manufacturer: { type: String }, 
    brand: { type: String },    
    costPrice: { type: Number }, 
    sellingPrice: { type: Number },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
module.exports = InventoryItem;
