// backend/routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/loginController');

// POST login
router.post('/login', loginController.login);

module.exports = router;
