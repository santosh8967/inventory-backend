// backend/models/Bill.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  items: [
    {
      itemName: String,
      quantity: Number,
      price: Number,
    },
  ],
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;

