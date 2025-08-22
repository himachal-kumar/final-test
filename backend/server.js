const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });
const connectDB = require('./src/lib/mongodb');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/campaigns', require('./src/api/campaigns/route'));
app.use('/api/auth', require('./src/api/auth/route'));
app.use('/api/donations', require('./src/api/donations/route'));
app.use('/api/funding-plans', require('./src/api/funding-plans/route'));
app.use('/api/payments', require('./src/api/payments/route'));
app.use('/api/razorpay', require('./src/api/razorpay/route'));
app.use('/api/subscriptions', require('./src/api/subscriptions/route'));
app.use('/api/users', require('./src/api/users/route'));

// Basic route
app.get('/', (req, res) => {
  res.send('NGO Backend API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});