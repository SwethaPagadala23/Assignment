// models/invoice.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    currency: { type: String, required: true },
    basicAmount: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    advancePaid: { type: Number, required: true },
    tcsApplicable: { type: Boolean, required: true },
    netPayable: { type: Number, required: true },
    alternativePayee1: { type: String },
    alternativePayee2: { type: String },
    city: { type: String },
    street: { type: String },
    country: { type: String },
    bankKey: { type: String },
    bankAccNo: { type: String },
    reference: { type: String },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
