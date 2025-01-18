const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawInventorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true }, 
    costPrice: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    firmId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    deleted_at: { type: Date, default: null } 
}, { timestamps: true });

const RawInventory = mongoose.model('RawInventory', RawInventorySchema);
module.exports = RawInventory;
