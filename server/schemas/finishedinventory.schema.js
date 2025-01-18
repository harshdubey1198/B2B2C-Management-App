const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishedInventorySchema = new Schema({
    name: { type: String, required: true }, 
    description: { type: String }, 
    quantity: { type: Number, required: true }, 
    sellingPrice: { type: Number, required: true }, 
    productionCost: { type: Number }, 
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }, 
    firmId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deleted_at: { type: Date, default: null } 
}, { timestamps: true });

const FinishedInventory = mongoose.model('FinishedInventory', FinishedInventorySchema);
module.exports = FinishedInventory;
