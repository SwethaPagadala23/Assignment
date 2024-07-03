const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  // useNewUrlParser and useUnifiedTopology options are no longer needed
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Invoice schema and model
const invoiceSchema = new mongoose.Schema({
  currency: String,
  invBasicAmt: String,
  invTaxAmt: String,
  totalInvAmt: String,
  advancePaid: String,
  tcsApplicable: String,
  netPayableAmt: String,
  alternativePayee1: String,
  alternativePayee2: String,
  city: String,
  street: String,
  country: String,
  bankKey: String,
  bankAccNo: String,
  reference: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// Add invoice details route
app.post('/api/invoices', async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch invoice details route
app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
