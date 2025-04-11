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

1. Buat database MySQL dengan nama `bookshop`
2. Import skema database:
   ```bash
   mysql bookshop_db < database-schema.sql
   ```
3. Import data contoh:
   ```bash
   mysql bookshop_db < sample_data.sql
   ```

### 2. Instalasi Proyek

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

### 3. Menjalankan Aplikasi

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

Proyek ini menyertakan data contoh untuk buku, pengguna, dan ulasan untuk membantu Anda memulai dengan cepat.

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
