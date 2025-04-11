const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Initialize express
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Test database connection
testConnection();

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bookshop API running'
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;