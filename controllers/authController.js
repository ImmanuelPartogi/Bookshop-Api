const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// Task 6: Register New user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide username, email and password'
    });
  }

  // Check if user already exists
  const userExists = await query(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [email, username]
  );

  if (userExists.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const result = await query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );

  if (result.affectedRows > 0) {
    // Get the newly created user
    const newUser = await query('SELECT id, username, email FROM users WHERE id = ?', [result.insertId]);

    // Generate token
    const token = generateToken(result.insertId);

    res.status(201).json({
      success: true,
      user: {
        id: newUser[0].id,
        username: newUser[0].username,
        email: newUser[0].email
      },
      token
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid user data'
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// Task 7: Login as a Registered user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Check if user exists
  const users = await query('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length === 0) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  const user = users[0];

  // Match password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Generate token
  const token = generateToken(user.id);

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe
};