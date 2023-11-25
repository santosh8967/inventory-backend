const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const shoeRoutes = require('./routes/shoeRoutes');
const billingRoutes = require('./routes/billingRoutes');
const loginRoutes = require('./routes/loginRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a root route
app.get('/', (req, res) => {
  res.send('Hello, world of programming!');
});

// Use absolute paths for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Login routes
app.use('/api', loginRoutes);

// Use authentication middleware for protected routes
app.use('/api/protected', authenticateToken);

// Protected route handler
app.get('/api/protected/data', (req, res) => {
  // Now you can handle the protected route logic separately
  res.json({ message: 'This is a protected route.', user: req.user });
});

// Shoe routes
app.use('/api', shoeRoutes);

// Billing routes
app.use('/api', billingRoutes);

// Send 'index.html' for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

