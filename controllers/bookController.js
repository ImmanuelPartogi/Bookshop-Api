const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const axios = require('axios');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
// Task 1: Get the book list available in the shop
const getBooks = asyncHandler(async (req, res) => {
  const books = await query('SELECT * FROM books ORDER BY title');

  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// @desc    Get book by ISBN
// @route   GET /api/books/isbn/:isbn
// @access  Public
// Task 2: Get the books based on ISBN
const getBookByISBN = asyncHandler(async (req, res) => {
  const { isbn } = req.params;

  const books = await query('SELECT * FROM books WHERE isbn = ?', [isbn]);

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: `Book with ISBN ${isbn} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: books[0]
  });
});

// @desc    Get books by author
// @route   GET /api/books/author/:author
// @access  Public
// Task 3: Get all books by Author
const getBooksByAuthor = asyncHandler(async (req, res) => {
  const { author } = req.params;

  const books = await query('SELECT * FROM books WHERE author LIKE ?', [`%${author}%`]);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// @desc    Get books by title
// @route   GET /api/books/title/:title
// @access  Public
// Task 4: Get all books based on Title
const getBooksByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;

  const books = await query('SELECT * FROM books WHERE title LIKE ?', [`%${title}%`]);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// @desc    Get all books using async callback
// @route   GET /api/books/async
// @access  Public
// Task 10: Get all books – Using async callback function
const getBooksAsync = async (callback) => {
  try {
    const books = await query('SELECT * FROM books ORDER BY title');
    callback(null, books);
  } catch (error) {
    callback(error, null);
  }
};

// Controller function to expose the async callback
const getBooksAsyncController = asyncHandler(async (req, res) => {
  getBooksAsync((error, books) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  });
});

// @desc    Search book by ISBN using promises
// @route   GET /api/books/promise/isbn/:isbn
// @access  Public
// Task 11: Search by ISBN – Using Promises
const searchByISBNPromise = (isbn) => {
  return new Promise(async (resolve, reject) => {
    try {
      const books = await query('SELECT * FROM books WHERE isbn = ?', [isbn]);
      
      if (books.length === 0) {
        reject(new Error(`Book with ISBN ${isbn} not found`));
      } else {
        resolve(books[0]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Controller function to expose the promise-based search
const searchByISBNController = asyncHandler(async (req, res) => {
  const { isbn } = req.params;

  try {
    const book = await searchByISBNPromise(isbn);
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Search books by author using axios
// @route   GET /api/books/axios/author/:author
// @access  Public
// Task 12: Search by Author
const searchByAuthorAxios = asyncHandler(async (req, res) => {
  const { author } = req.params;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  try {
    // Using Axios to call our own API (simulating an external API call)
    const response = await axios.get(`${baseUrl}/api/books/author/${author}`);
    
    res.status(200).json({
      success: true,
      source: 'Axios request',
      count: response.data.count,
      data: response.data.data
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Server error'
    });
  }
});

// @desc    Search books by title using axios
// @route   GET /api/books/axios/title/:title
// @access  Public
// Task 13: Search by Title
const searchByTitleAxios = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  try {
    // Using Axios to call our own API (simulating an external API call)
    const response = await axios.get(`${baseUrl}/api/books/title/${title}`);
    
    res.status(200).json({
      success: true,
      source: 'Axios request',
      count: response.data.count,
      data: response.data.data
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Server error'
    });
  }
});

module.exports = {
  getBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBooksAsyncController,
  searchByISBNController,
  searchByAuthorAxios,
  searchByTitleAxios
};