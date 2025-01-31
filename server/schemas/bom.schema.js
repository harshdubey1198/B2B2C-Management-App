const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BOMSchema = new Schema({
  productName: { type: String, required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  qtyType: { type: String },
  type: { type: String, enum: ['raw_material', 'finished_good'] },
  costPrice: { type: Number },
  sellingPrice: { type: Number },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
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
  rawMaterials: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
      quantity:{type : Number},
      wastePercentage: { type: Number, default: 0 },
      variants: [
        {
          variantId: { type: String, },          
          optionLabel: { type: String }, 
          quantity: { type: Number, }, 
          price : { type: Number, default: 0 },
          waste: { type: String, }, 
          wastePercentage: { type: Number, default: 0 }      
        }
      ],
    }
  ],
  // wastagePercentage: { type: Number, default: 0 },
  firmId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['created', 'approved', 'in_progress', 'completed', 'cancelled'], 
    default: 'created' 
  },
  notes: [{ type: String }],
  deleted_at: { type: Date, default: null }
}, { timestamps: true });

const BOM = mongoose.model('BOM', BOMSchema);
module.exports = BOM