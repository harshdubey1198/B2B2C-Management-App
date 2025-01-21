const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawMaterialsInventorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    qtyType: { type: String, required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number },
    reorderLevel: { type: Number, default: 0 },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    tax: {
        taxId: { type: Schema.Types.ObjectId, ref: 'Tax' },
        components: [
            {
                taxType: { type: String },
                rate: { type: Number }
            }
        ]
    },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    variants: [
        {
            variationType: { type: String },
            optionLabel: { type: String },
            price: { type: Number, default: 0 },
            stock: { type: Number, default: 0 },
            sku: { type: String },
            barcode: { type: String }
        }
    ],
    batches: [
        {
            batchNumber: { type: String },
            quantity: { type: Number },
            manufacturingDate: { type: Date },
            expiryDate: { type: Date },
            serialNumbers: [String]
        }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    firmId: { type: Schema.Types.ObjectId, ref: 'User' },
    deleted_at: { type: Date, default: null }
}, { timestamps: true });

const RawMaterialsInventory = mongoose.model('RawMaterialsInventory', RawMaterialsInventorySchema);
module.exports = RawMaterialsInventory;
