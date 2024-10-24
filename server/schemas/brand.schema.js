const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, }, 
    description: { type: String },
    website: { type: String },              
    country: { type: String },          
    manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },     
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
    firmId: { type: Schema.Types.ObjectId, ref: 'User' },    
    deleted_at: { type: Date, default: null }  
}, { timestamps: true });

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;
