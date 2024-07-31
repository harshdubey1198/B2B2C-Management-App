const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firmAdminSchema = new Schema({
    cidm: { type: String, required: true },
    fid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['FirmAdmin'] },
    permissions: [
        { 
            route: { type: String }, 
            sub_permissions: [{ type: String }] 
        }
    ]
}, {timestamps: true});  

const FirmAdmin = mongoose.model('FirmAdmin', firmAdminSchema)

module.exports = FirmAdmin