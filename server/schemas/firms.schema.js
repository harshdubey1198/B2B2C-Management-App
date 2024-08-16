const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firmsSchema = new Schema({
    clientAdmin : {type: mongoose.Schema.Types.ObjectId, ref: "ClientAdmin"},
    cidm: { type: String, required: true },
    fuid: { type: String, required: true },
    firmEmail: { type: String, required: true },
    firmName: { type: String, required: true },
    firmPhone: {type: String, required: true},
    firmAdmin: {type: mongoose.Schema.Types.ObjectId, ref: "FirmAdmin"},
    avatar: { type: String, default: "https://res-console.cloudinary.com/harshdubey1198/media_explorer_thumbnails/e4538e487d236764e095b75071b82209/detailed"},
}, {timestamps: true});  

const Firms = mongoose.model('Firms', firmsSchema)

module.exports = Firms