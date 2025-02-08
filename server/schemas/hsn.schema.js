const mongoose = require('mongoose');

const hsnSchema = new mongoose.Shcema({
    hsn: {type: String},
    description: {type: String},
    deleted_at: { type: Date, default: null }
}, {timestamps: true})

const HSN = mongoose.model('HSN', hsnSchema)

module.exports = HSN;