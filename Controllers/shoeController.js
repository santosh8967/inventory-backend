// backend/controllers/shoeController.js
const Shoe = require('../Models/Shoe');

const getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllShoes,
};
