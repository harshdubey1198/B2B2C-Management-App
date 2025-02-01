const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaxSchema = new Schema({
    taxName: { type: String, required: true },  
    taxRates: [
        {
            taxType: { type: String },  
            rate: { type: Number, required: true }  
        }
    ],
    isActive: { type: Boolean, default: true },  
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },  
    firmId: { type: Schema.Types.ObjectId, ref: 'User'},  
    deleted_at: { type: Date, default: null }  
}, { timestamps: true });

const Tax = mongoose.model('Tax', TaxSchema);
module.exports = Tax;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const TaxSchema = new Schema({
//     taxName:   { type: String, required: true },  
//     taxRates:  { type: Number, required: true },
//     isActive:  { type: Boolean, default: true },  
//     createdBy: { type: Schema.Types.ObjectId, ref: 'User' },  
//     firmId:    { type: Schema.Types.ObjectId, ref: 'User'},  
//     deleted_at:{ type: Date, default: null }  
// }, { timestamps: true });

// const Tax = mongoose.model('Tax', TaxSchema);
// module.exports = Tax;
