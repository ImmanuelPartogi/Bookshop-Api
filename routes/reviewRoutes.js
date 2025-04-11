const express = require('express');
const router = express.Router();
const { deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Delete review
router.delete('/:id', protect, deleteReview);

module.exports = router;