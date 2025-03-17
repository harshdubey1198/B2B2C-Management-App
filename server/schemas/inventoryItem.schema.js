const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
    name: { type: String, required: true },
    sku: { type: String },
    description: { type: String },
    quantity: { type: Number },
    qtyType: { 
        type: String, 
        enum: ['kg', 'grams', 'pcs', 'litre', 'meters', 'centimeters', 'feet'], 
    },    
    supplier: { type: String },
    ProductHsn: { type: String },
    manufacturer: { type: String },
    type: { type: String, enum: ['raw_material', 'finished_good'], required: true }, 
    brand: { type: String },
    costPrice: { type: Number },
    sellingPrice: { type: Number },
    manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },   
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    firmId: { type: Schema.Types.ObjectId, ref: 'User' },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    tax: {
        taxId: { type: Schema.Types.ObjectId, ref: 'Tax' },
        // components: [{
        //    taxType: { type: String },
        //    rate: { type: Number }
        // }]
        selectedTaxTypes: [{ type: Schema.Types.ObjectId }]
    },
    criticalStockAlerts: [{ type: Number }],
    variants: [{
        variationType: { type: String },
        optionLabel: { type: String },
        price: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },
        reservedQuantity: { type: Number, default: 0 },
        sku: { type: String },
        barcode: { type: String }
    }],
    // batches:{
    //         batchNumber: { type: String },
    //         quantity: { type: Number },
    //         manufacturingDate: { type: Date },
    //         expiryDate: { type: Date },
    //         serialNumbers: [String]
    //     }
    // ,
    deleted_at: { type: Date, default: null }
}, { timestamps: true });

const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
module.exports = InventoryItem;