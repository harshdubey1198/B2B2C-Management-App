const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductionOrderSchema = new Schema({
  bomId: { type: Schema.Types.ObjectId, ref: 'BOM', required: true },
  quantityToProduce: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  firmId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('ProductionOrder', ProductionOrderSchema);
