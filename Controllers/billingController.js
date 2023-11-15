// backend/controllers/billingController.js
const Bill = require('../Models/Bill');

const createBill = async (req, res) => {
  const { customerName, totalAmount, items } = req.body;

  try {
    const newBill = new Bill({
      customerName,
      totalAmount,
      items,
    });

    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBill,
};

