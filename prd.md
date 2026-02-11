# Product Requirements Document (PRD) - FinTrack Core API

## 1. Ringkasan Proyek
**FinTrack Core** adalah sistem API backend untuk manajemen keuangan pribadi. Fokus utama proyek ini adalah menyediakan fondasi yang aman, akurat dalam perhitungan, dan memiliki struktur kode yang bersih (Clean Architecture) sebagai standar industri startup.

## 2. Masalah & Solusi
*   **Masalah:** Banyak pemula membuat aplikasi keuangan yang hanya menyimpan data tanpa validasi, sehingga saldo sering tidak akurat atau tidak aman.
*   **Solusi:** Membangun API dengan sistem double-check pada logika transaksi, keamanan autentikasi JWT, dan skema database yang terelasi dengan benar.

## 3. Fitur Utama (Scope)
Berikut adalah alur fitur yang harus diselesaikan dari awal sampai siap pakai:

### Fase 1: Fondasi & Autentikasi
*   **User Registration:** Mendaftarkan akun dengan email dan password.
*   **User Login:** Mendapatkan akses token (JWT) untuk keamanan.
*   **Profile Management:** Melihat data diri pengguna yang sedang login.

### Fase 2: Kategori & Transaksi
*   **Category Management:** Pengguna bisa membuat kategori (contoh: "Makanan", "Gaji", "Investasi").
*   **Transaction CRUD:**
    *   Mencatat pemasukan (Income).
    *   Mencatat pengeluaran (Expense).
    *   Menampilkan riwayat transaksi berdasarkan tanggal.

### Fase 3: Logika Bisnis & Laporan (The "Engineer" Part)
*   **Balance Calculation:** API otomatis menghitung total saldo terkini (Total Income - Total Expense).
*   **Basic Analytics:** API mengembalikan ringkasan pengeluaran terbesar di bulan berjalan.

## 4. Struktur Data (Database Schema)
Sebagai Software Engineer, Anda harus memikirkan bagaimana data saling terhubung.

*   **Users Table:** id, email, password, created_at
*   **Categories Table:** id, user_id, name, type (income/expense)
*   **Transactions Table:** id, user_id, category_id, amount, note, date, created_at

## 5. Alur Kerja Pengembangan (Milestones)
Berikut adalah urutan kerja Anda dari nol sampai bisa dipakai:

| Tahap | Aktivitas Utama | Output |
| :--- | :--- | :--- |
| **1. Setup** | Inisialisasi repo, setup Node.js/Go, koneksi PostgreSQL. | Repo aktif & Koneksi DB sukses. |
| **2. Auth** | Membuat sistem Register & Login (Bcrypt + JWT). | User bisa login via Postman. |
| **3. CRUD** | Membuat endpoint Kategori dan Transaksi. | Data bisa disimpan & dibaca dari DB. |
| **4. Logic** | Membuat fungsi "Calculate Balance" di lapisan Service. | Saldo tampil dengan benar. |
| **5. Docs** | Membuat dokumentasi API dengan Swagger/OpenAPI. | Link API docs yang bisa dicoba orang lain. |

## 6. Persyaratan Teknis (Tech Stack)
*   **Bahasa:** TypeScript (Node.js) atau Go.
*   **Database:** PostgreSQL.
*   **Library Utama:**
    *   ORM (Prisma/Drizzle/GORM) untuk interaksi database.
    *   Zod atau Joi untuk validasi data input.
    *   JSON Web Token (JWT) untuk keamanan.
