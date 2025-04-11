const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get current user profile
router.get('/me', protect, getMe);

module.exports = router;