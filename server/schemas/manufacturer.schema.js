const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
    name: { type: String },  
    address: { 
        h_no: { type: String },
        city: { type: String },
        state: { type: String },
        zip_code: { type: String },
        country: { type: String }
    },
    contactPerson: { type: String },    
    phone: { type: String },
    email: { type: String },
    website: { type: String },         
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
    firmId: { type: Schema.Types.ObjectId, ref: 'User' },   
    deleted_at: { type: Date, default: null } 
}, { timestamps: true });

const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);
module.exports = Manufacturer;
