const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firmAdminSchema = new Schema({
    cidm: { type: String, required: true },
    fuid: { type: String, required: true },
    faid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "https://res-console.cloudinary.com/harshdubey1198/media_explorer_thumbnails/e4538e487d236764e095b75071b82209/detailed"},
    role: { type: String, required: true, enum: ['FirmAdmin'] },
    permissions: [
        { 
            route: { type: String }, 
            sub_permissions: [{ type: String }] 
        }
    ],
    logs: [{
        date: { type: Date, required: true },
        time: { type: String, required: true },
        page_history: [{ type: String }],
        ip_address: { type: String, required: true },
        country: { type: String, required: true }
    }]
}, {timestamps: true});  

const FirmAdmin = mongoose.model('FirmAdmin', firmAdminSchema)

module.exports = FirmAdmin