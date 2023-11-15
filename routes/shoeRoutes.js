// backend/routes/shoeRoutes.js
const express = require('express');
const router = express.Router();
const shoeController = require('../Controllers/ShoeController');

// GET all shoes
router.get('/shoes', shoeController.getAllShoes);

module.exports = router;
