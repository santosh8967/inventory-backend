// backend/controllers/registrationController.js
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password }); // You should hash the password using a secure method like bcrypt

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ userId: newUser._id },config.SECRET_KEY, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
};
