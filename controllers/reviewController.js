const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get reviews for a book
// @route   GET /api/books/:bookId/reviews
// @access  Public
// Task 5: Get book Review
const getBookReviews = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  // Check if book exists
  const book = await query('SELECT * FROM books WHERE id = ?', [bookId]);

  if (book.length === 0) {
    return res.status(404).json({
      success: false,
      message: `Book with id ${bookId} not found`
    });
  }

  // Get reviews with user information
  const reviews = await query(
    `SELECT r.id, r.rating, r.comment, r.created_at, 
            u.id as user_id, u.username
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.book_id = ?
     ORDER BY r.created_at DESC`,
    [bookId]
  );

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

// @desc    Add or update a review
// @route   POST /api/books/:bookId/reviews
// @access  Private
// Task 8: Add/Modify a book review
const addOrUpdateReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  // Validate input
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a rating between 1 and 5'
    });
  }

  // Check if book exists
  const book = await query('SELECT * FROM books WHERE id = ?', [bookId]);

  if (book.length === 0) {
    return res.status(404).json({
      success: false,
      message: `Book with id ${bookId} not found`
    });
  }

  // Check if review already exists for this user and book
  const existingReview = await query(
    'SELECT * FROM reviews WHERE book_id = ? AND user_id = ?',
    [bookId, userId]
  );

  let result;
  
  if (existingReview.length > 0) {
    // Update existing review
    result = await query(
      'UPDATE reviews SET rating = ?, comment = ? WHERE book_id = ? AND user_id = ?',
      [rating, comment, bookId, userId]
    );

    if (result.affectedRows > 0) {
      const updatedReview = await query(
        'SELECT * FROM reviews WHERE book_id = ? AND user_id = ?',
        [bookId, userId]
      );

      res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        data: updatedReview[0]
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to update review'
      });
    }
  } else {
    // Create new review
    result = await query(
      'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [bookId, userId, rating, comment]
    );

    if (result.affectedRows > 0) {
      const newReview = await query(
        'SELECT * FROM reviews WHERE id = ?',
        [result.insertId]
      );

      res.status(201).json({
        success: true,
        message: 'Review added successfully',
        data: newReview[0]
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to add review'
      });
    }
  }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
// Task 9: Delete book review added by that particular user
const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Check if review exists and belongs to user
  const review = await query(
    'SELECT * FROM reviews WHERE id = ?',
    [id]
  );

  if (review.length === 0) {
    return res.status(404).json({
      success: false,
      message: `Review with id ${id} not found`
    });
  }

  if (review[0].user_id !== userId) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this review'
    });
  }

  // Delete review
  const result = await query(
    'DELETE FROM reviews WHERE id = ?',
    [id]
  );

  if (result.affectedRows > 0) {
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      data: {}
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Failed to delete review'
    });
  }
});

module.exports = {
  getBookReviews,
  addOrUpdateReview,
  deleteReview
};