# 📚 Bookshop API

Bookshop API adalah aplikasi manajemen buku komprehensif yang dibangun menggunakan **Node.js**, **Express**, dan **MySQL**. Aplikasi ini menyediakan berbagai fitur manajemen buku dan ulasan untuk pengguna umum dan terdaftar.

## 🚀 Gambaran Proyek

API ini memungkinkan pengguna untuk:
- Menjelajahi buku berdasarkan berbagai kriteria (ISBN, penulis, judul)
- Melihat ulasan buku
- Mendaftar dan login
- Menambah, mengubah, dan menghapus ulasan (untuk pengguna terdaftar)

## 🛠 Prasyarat

- Node.js (direkomendasikan v14+)
- MySQL
- npm (Node Package Manager)

## 📋 Langkah Instalasi

### 1. Penyiapan Database

1. Buat database MySQL dengan nama `bookshop_db`
2. Import skema database:
   ```bash
   mysql bookshop_db < database-schema.sql
   ```
3. Import data contoh:
   ```bash
   mysql bookshop_db < sample_data.sql
   ```

### 2. Skema Database

#### Tabel Users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_username_unique UNIQUE (username),
    CONSTRAINT users_email_unique UNIQUE (email)
);
```

#### Tabel Books
```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT books_isbn_unique UNIQUE (isbn)
);
```

#### Tabel Reviews
```sql
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. Data Contoh

#### Contoh Data Buku
```sql
INSERT INTO books (isbn, title, author, price, description) VALUES
('9780747532743', 'Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 15.99, 'Buku pertama dalam seri Harry Potter'),
('9780747538486', 'Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 16.99, 'Buku kedua dalam seri Harry Potter'),
('9781984822178', 'Where the Crawdads Sing', 'Delia Owens', 14.99, 'Novel tentang seorang gadis terlantar yang tumbuh di rawa-rawa Carolina Utara'),
('9780735219090', 'Educated: A Memoir', 'Tara Westover', 18.99, 'Memoar tentang seorang wanita yang meninggalkan keluarga survivalis dan meraih gelar PhD'),
('9780316556347', 'Circe', 'Madeline Miller', 16.99, 'Retelling kisah Circe dari mitologi Yunani'),
('9780525559474', 'The Overstory', 'Richard Powers', 17.99, 'Novel tentang sembilan orang Amerika yang pengalaman hidupnya terkait dengan pohon'),
('9780525520375', 'Normal People', 'Sally Rooney', 14.99, 'Novel tentang hubungan kompleks dua remaja dari latar belakang berbeda'),
('9780735224315', 'Little Fires Everywhere', 'Celeste Ng', 15.99, 'Novel tentang komunitas terencana di Cleveland dan peristiwa yang terjadi'),
('9780062316097', 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 19.99, 'Buku yang mengeksplorasi sejarah dan dampak Homo sapiens'),
('9781501173219', 'The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 15.99, 'Novel tentang aktris Hollywood fiktif dan kehidupannya yang misterius');
```

#### Contoh Data Pengguna
```sql
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', '$2a$10$x5BmDHMAD2G7hH.QyoCwJe7I1ZBUcXSZQWW5JjWLcMVuLT.tY1PnK'),
('jane_doe', 'jane@example.com', '$2a$10$x5BmDHMAD2G7hH.QyoCwJe7I1ZBUcXSZQWW5JjWLcMVuLT.tY1PnK'),
('bob_smith', 'bob@example.com', '$2a$10$x5BmDHMAD2G7hH.QyoCwJe7I1ZBUcXSZQWW5JjWLcMVuLT.tY1PnK');
```

#### Contoh Data Ulasan
```sql
INSERT INTO reviews (book_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Buku yang luar biasa! Tidak bisa berhenti membaca.'),
(1, 2, 4, 'Sangat bagus, tapi saya lebih suka buku kedua dalam seri.'),
(2, 1, 5, 'Bahkan lebih baik dari yang pertama!'),
(3, 3, 4, 'Ditulis dengan indah dan deskripsi yang hidup.'),
(4, 2, 5, 'Menginspirasi dan membuat berpikir.'),
(5, 3, 4, 'Sudut pandang baru tentang mitologi Yunani.'),
(6, 1, 3, 'Konsep menarik tapi agak panjang.'),
(7, 2, 5, 'Menangkap kompleksitas hubungan dengan sempurna.'),
(8, 3, 4, 'Cerita yang menarik dengan karakter yang berkembang baik.'),
(9, 1, 5, 'Perspektif mengejutkan tentang sejarah manusia.');
```

### 4. Instalasi Proyek

```bash
# Clone repository
git clone https://github.com/ImmanuelPartogi/Bookshop-Api
cd bookshop-api

# Install dependensi
npm install

# Konfigurasi environment
cp .env.example .env
# Edit file .env dengan kredensial database Anda
```

### 5. Menjalankan Aplikasi

```bash
# Mode pengembangan
npm run dev

# Mode produksi
npm start
```

## 🌐 Kategori Endpoint

### 🔓 Endpoint Publik
| Metode | Endpoint | Deskripsi |
|--------|----------|-------------|
| GET | `/api/books` | Ambil semua buku yang tersedia |
| GET | `/api/books/isbn/:isbn` | Cari buku berdasarkan ISBN |
| GET | `/api/books/author/:author` | Cari buku berdasarkan penulis |
| GET | `/api/books/title/:title` | Cari buku berdasarkan judul |
| GET | `/api/books/:bookId/reviews` | Dapatkan ulasan untuk buku tertentu |
| POST | `/api/auth/register` | Daftarkan pengguna baru |
| POST | `/api/auth/login` | Login pengguna |

### 🔐 Endpoint Terautentikasi
| Metode | Endpoint | Deskripsi |
|--------|----------|-------------|
| POST | `/api/books/:bookId/reviews` | Tambah atau perbarui ulasan buku |
| DELETE | `/api/reviews/:id` | Hapus ulasan milik pengguna sendiri |

### ⚙️ Metode Node.js Lanjutan
| Metode | Endpoint | Deskripsi |
|--------|----------|-------------|
| GET | `/api/books/async` | Ambil buku menggunakan async callback |
| GET | `/api/books/promise/isbn/:isbn` | Cari buku berdasarkan ISBN menggunakan Promises |
| GET | `/api/books/axios/author/:author` | Cari buku berdasarkan penulis menggunakan Axios |
| GET | `/api/books/axios/title/:title` | Cari buku berdasarkan judul menggunakan Axios |

## 🧪 Pengujian

1. Import `bookshop-api.postman_collection.json` ke Postman
2. Atur `base_url` (default: `http://localhost:5000`)
3. Untuk endpoint terautentikasi, login terlebih dahulu untuk mendapatkan token

## 🔐 Autentikasi

- Gunakan `/api/auth/login` untuk mendapatkan token autentikasi
- Sertakan token di header Otorisasi untuk rute yang dilindungi

## 📦 Data Contoh

Proyek ini menyertakan data contoh untuk buku, pengguna, dan ulasan untuk membantu Anda memulai dengan cepat:
- 10 buku dengan detail lengkap
- 3 pengguna dengan kredensial login
- 10 ulasan yang terkait dengan buku dan pengguna

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur Anda (`git checkout -b fitur/FiturMenakjubkan`)
3. Commit perubahan Anda (`git commit -m 'Tambahkan FiturMenakjubkan'`)
4. Push ke branch (`git push origin fitur/FiturMenakjubkan`)
5. Buka Pull Request

## 📞 Kontak

- GitHub: https://github.com/ImmanuelPartogi

## 🚨 Disclaimer

Ini adalah proyek contoh untuk tujuan pendidikan. Pastikan Anda mengikuti praktik terbaik untuk keamanan dan kinerja di lingkungan produksi.
