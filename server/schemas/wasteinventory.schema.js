const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WasteManagementSchema = new Schema({
    productionOrderId: { type: Schema.Types.ObjectId, ref: 'ProductionOrder', required: true }, 
    firmId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    rawMaterials: [
        {
            itemId: { type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true }, 
            wasteQuantity: { type: Number, required: true }, 
            reason: { type: String } 
        } 
    ],
    status: { 
        type: String, 
        enum: ['created', 'approved', 'completed', 'cancelled'], 
        default: 'created' 
    },
    deleted_at: { type: Date, default: null } 
}, { timestamps: true });

const WasteManagement = mongoose.model('WasteManagement', WasteManagementSchema);
module.exports = WasteManagement;