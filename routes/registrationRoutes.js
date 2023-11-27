// backend/routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const registrationController = require('../Controllers/registrationController');

// POST registration
router.post('/register', registrationController.register);

module.exports = router;
