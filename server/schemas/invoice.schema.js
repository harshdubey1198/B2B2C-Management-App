const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    invoiceNumber: { type: String, required: true },
    customerName: { type: String, required: true },     
    customerEmail: { type: String, required: true },    
    customerPhone: { type: String },                     
    customerAddress: {                                  
        h_no: { type: String },
        city: { type: String },
        district : {type:String},
        state: { type: String },
        zip_code: { type: String },
        country: { type: String },
        nearby : {type:String}
    },
    invoiceType: { type: String },
    // invoiceSubType : {invoiceSubType},
    firmId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    items: [{
        itemId: { type: Schema.Types.ObjectId, ref: 'InventoryItem' },
        description: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        tax: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        total: { type: Number, required: true }
    }],
    invoiceDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    totalAmount: { type: Number },
    status: { type: String, enum: ['paid', 'unpaid', 'partially paid'], default: 'unpaid' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
