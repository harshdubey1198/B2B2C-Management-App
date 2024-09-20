const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');

const InventoryItemSchema = new Schema({
    name: { type: String, required: true }, 
    description: { type: String },                  
    quantity: { type: Number }, 
    qtyType: { type: String },   
    supplier: { type: String },  
    ProductHsn: { type: String },
    manufacturer: { type: String }, 
    brand: { type: String },    
    costPrice: { type: Number }, 
    sellingPrice: { type: Number },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    firmId: {type: Schema.Types.ObjectId, ref: 'User'},
    variants: [{
        variationType: { type: String }, 
        optionLabel: { type: String}, 
        price: { type: Number, default: 0 }, 
        stock: { type: Number, default: 0 }, 
        sku: { type: String },
        barcode: { type: String }
    }]
}, { timestamps: true, paranoid: true });

InventoryItemSchema.plugin(mongooseParanoidPlugin, { field: 'deleted_at' });

const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
module.exports = InventoryItem;
