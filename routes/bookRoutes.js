const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBooksAsyncController,
  searchByISBNController,
  searchByAuthorAxios,
  searchByTitleAxios
} = require('../controllers/bookController');
const { getBookReviews, addOrUpdateReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Book routes
router.get('/', getBooks);
router.get('/isbn/:isbn', getBookByISBN);
router.get('/author/:author', getBooksByAuthor);
router.get('/title/:title', getBooksByTitle);

// Async/Promise/Axios routes
router.get('/async', getBooksAsyncController);
router.get('/promise/isbn/:isbn', searchByISBNController);
router.get('/axios/author/:author', searchByAuthorAxios);
router.get('/axios/title/:title', searchByTitleAxios);

// Book reviews routes
router.get('/:bookId/reviews', getBookReviews);
router.post('/:bookId/reviews', protect, addOrUpdateReview);

module.exports = router;