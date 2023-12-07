// // backend/controllers/billingController.js
// const Bill = require('../Models/Bill');

// const createBill = async (req, res) => {
//   const { customerName, totalAmount, items } = req.body;

//   try {
//     const newBill = new Bill({
//       customerName,
//       totalAmount,
//       items,
//     });

//     await newBill.save();
//     res.status(201).json(newBill);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   createBill,
// };

const Bill = require('../Models/Bill');

const createBill = async (req, res) => {
  const { customerName, totalAmount, items } = req.body;

  // Add validation for required fields
  if (!customerName || !totalAmount || !items) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newBill = new Bill({
      customerName,
      totalAmount,
      items,
    });

    // Save the new bill
    await newBill.save();

    res.status(201).json(newBill);
  } catch (error) {
    console.error(error.message);

    // Handle specific MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Bill with the same data already exists.' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBill,
};
