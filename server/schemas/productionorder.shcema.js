const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductionOrderSchema = new Schema({
    productionOrderNumber: { type: String, unique: true },
    bomId: { type: Schema.Types.ObjectId, ref: 'BOM' },
    quantity: { type: Number },
    rawMaterials: [
        {
            itemId: { type: Schema.Types.ObjectId, ref: 'InventoryItem' },
            quantity: { type: Number },
            wastageQuantity: { type: Number, default: 0 },
            variants: [
                {
                    variantId: { type: String },
                    optionLabel: { type: String },
                    quantity: { type: Number },
                    wastageQuantity: { type: Number, default: 0 }
                }
            ]
        }
    ],
    wastage: { type: Number, default: 0 },
    firmId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['created', 'in_progress', 'completed', 'cancelled'],
        default: 'created'
    },
    notes: { type: String },
    deleted_at: { type: Date, default: null }
}, { timestamps: true });

const ProductionOrder = mongoose.model('ProductionOrder', ProductionOrderSchema);
module.exports = ProductionOrder;