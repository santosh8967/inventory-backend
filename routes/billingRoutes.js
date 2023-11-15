// backend/routes/billingRoutes.js
const express = require('express');
const router = express.Router();
const billingController = require('../Controllers/billingController');

// POST a new bill
router.post('/bill', billingController.createBill);

module.exports = router;
