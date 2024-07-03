// routes/invoices.js
const router = require('express').Router();
let Invoice = require('../models/invoice.model');

// Add a new invoice
router.post('/add', async (req, res) => {
  const newInvoice = new Invoice(req.body);

  try {
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
