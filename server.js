const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the 'path' module
const config = require('./config/config');
const shoeRoutes = require('./routes/shoeRoutes');
const billingRoutes = require('./routes/billingRoutes');

const app = express();
const port = process.env.PORT || 8000; // Corrected the port to 8000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/shoe_inventory', { useNewUrlParser: true, useUnifiedTopology: true })
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

// Shoe routes
app.use('/api', shoeRoutes);

// Billing routes
app.use('/api', billingRoutes);

// Use absolute paths for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Send 'index.html' for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

