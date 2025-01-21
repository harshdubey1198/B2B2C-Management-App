const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductionOrderSchema = new Schema({
    productionOrderNumber: { type: String, required: true, unique: true }, 
    bomId: { type: Schema.Types.ObjectId, ref: 'BOM', required: true },
    quantity: { type: Number, required: true }, 
    rawMaterials: [
        {
            itemId: { type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
            quantity: { type: Number, required: true }, 
            wastageQuantity: { type: Number, default: 0},
        }
    ],
    wastage: { type: Number, default: 0 },
    firmId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['created', 'in_progress', 'completed', 'cancelled'],
        default: 'created',
    },
    notes: { type: String },
    deleted_at: { type: Date, default: null }, 
}, { timestamps: true });

const ProductionOrder = mongoose.model('ProductionOrder', ProductionOrderSchema);
module.exports = ProductionOrder;
