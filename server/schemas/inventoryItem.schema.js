const mongoose = require('mongoose');
const { string } = require('prop-types');
const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
    name: { type: String }, 
    description: { type: String },                  
    costPrice: { type: Number},   
    hsnNumber: {type: String}, 
    sellingPrice: { type: Number}, 
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category'}, 
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory' }, 
    quantityInStock: { type: Number }, 
    reorderLevel: { type: Number }, 
    variants: [VariantSchema]     
}, {timestamps: true});

const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
module.exports = InventoryItem;
