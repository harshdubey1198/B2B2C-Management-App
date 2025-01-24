const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BOMSchema = new Schema({
  productName: { type: String, required: true },
  rawMaterials: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
      quantity:{type : Number},
      variants: [
        {
          variantId: { type: String, },          
          optionLabel: { type: String }, 
          quantity: { type: Number, }, 
          waste: { type: String, },       
        }
      ],
    }
  ],
  wastagePercentage: { type: Number, default: 0 },
  firmId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['created', 'approved', 'in_progress', 'completed', 'cancelled'], 
    default: 'created' 
  },
  notes: { type: String },
  deleted_at: { type: Date, default: null }
}, { timestamps: true });

const BOM = mongoose.model('BOM', BOMSchema);
module.exports = BOM
 
