# 📚 Bookshop API

Bookshop API is a comprehensive book management application built using **Node.js**, **Express**, and **MySQL**. The application provides various book and review management features for both public and registered users.

## 🚀 Project Overview

This API allows users to:
- Browse books by various criteria (ISBN, author, title)
- View book reviews
- Register and login
- Add, modify, and delete reviews (for registered users)

## 🛠 Prerequisites

- Node.js (v14+ recommended)
- MySQL
- npm (Node Package Manager)

## 📋 Installation Steps

### 1. Database Setup

1. Create a MySQL database named `bookshop`
2. Import database schema:
   ```bash
   mysql bookshop < database-schema.sql
   ```
3. Import sample data:
   ```bash
   mysql bookshop < sample_data.sql
   ```

### 2. Project Installation

```bash
# Clone the repository
git clone https://github.com/ImmanuelPartogi/Bookshop-Api
cd bookshop-api

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env file with your database credentials
```

### 3. Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🌐 Endpoint Categories

### 🔓 Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Retrieve all available books |
| GET | `/api/books/isbn/:isbn` | Find book by ISBN |
| GET | `/api/books/author/:author` | Find books by author |
| GET | `/api/books/title/:title` | Find books by title |
| GET | `/api/books/:bookId/reviews` | Get reviews for a specific book |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |

### 🔐 Authenticated Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books/:bookId/reviews` | Add or update book review |
| DELETE | `/api/reviews/:id` | Delete user's own review |

### ⚙️ Advanced Node.js Methods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books/async` | Fetch books using async callback |
| GET | `/api/books/promise/isbn/:isbn` | Find book by ISBN using Promises |
| GET | `/api/books/axios/author/:author` | Find books by author using Axios |
| GET | `/api/books/axios/title/:title` | Find books by title using Axios |

## 🧪 Testing

1. Import `bookshop-api.postman_collection.json` to Postman
2. Set `base_url` (default: `http://localhost:5000`)
3. For authenticated endpoints, first login to obtain a token

## 🔐 Authentication

- Use `/api/auth/login` to get an authentication token
- Include the token in the Authorization header for protected routes

## 📦 Sample Data

The project includes sample data for books, users, and reviews to help you get started quickly.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- GitHub: (https://github.com/ImmanuelPartogi)

## 🚨 Disclaimer

This is a sample project for educational purposes. Ensure you follow best practices for security and performance in a production environment.
