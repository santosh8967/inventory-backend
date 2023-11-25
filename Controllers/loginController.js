// backend/controllers/loginController.js
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  login,
};
