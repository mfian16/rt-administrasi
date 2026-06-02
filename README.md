# 🏘️ Sistem Administrasi RT — Full Stack Web Application

![Laravel](https://img.shields.io/badge/Laravel-Backend-red?style=for-the-badge\&logo=laravel)
![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge\&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?style=for-the-badge\&logo=mysql)
![Sanctum](https://img.shields.io/badge/Laravel%20Sanctum-Authentication-purple?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-yellow?style=for-the-badge\&logo=vite)

Sistem Administrasi RT adalah aplikasi web full stack untuk membantu pengelolaan data penghuni, rumah, pembayaran iuran, pengeluaran RT, dashboard keuangan, dan laporan administrasi RT.

Project ini dibuat sebagai hasil pengerjaan **Skill Fit Test Full Stack Programmer** dengan ketentuan backend dan frontend dibuat secara terpisah menggunakan **Laravel**, **React**, dan **MySQL**.

---

# 🚀 Fitur Utama

- ✅ Authentication login admin menggunakan Laravel Sanctum
- ✅ Dashboard ringkasan saldo kas RT
- ✅ Grafik tren pemasukan, pengeluaran, dan saldo RT
- ✅ Manajemen data penghuni
- ✅ Upload dan preview foto KTP penghuni
- ✅ Manajemen data rumah
- ✅ Detail rumah dengan penghuni aktif
- ✅ Riwayat penghuni rumah
- ✅ Manajemen pembayaran iuran Satpam dan Kebersihan
- ✅ Pembayaran iuran 1 bulan
- ✅ Pembayaran iuran 12 bulan sekaligus
- ✅ Detail pembayaran dalam modal
- ✅ Manajemen pengeluaran rutin dan tidak rutin
- ✅ Detail pengeluaran dalam modal
- ✅ Laporan keuangan tahunan dan bulanan
- ✅ Filter laporan berdasarkan tahun dan bulan
- ✅ Search, filter, pagination
- ✅ Format rupiah dan tanggal Indonesia
- ✅ Toast notification berhasil/gagal
- ✅ Backend dan frontend terpisah
- ✅ REST API

---

# ✨ Highlights

* Full stack architecture dengan backend Laravel dan frontend React terpisah
* Token authentication menggunakan Laravel Sanctum
* Dashboard modern untuk monitoring kas RT
* Fitur pembayaran 12 bulan sekaligus sesuai kebutuhan studi kasus
* Laporan keuangan dengan grafik dan detail transaksi
* UI dark theme yang konsisten dan responsive
* Seeder data demo realistis untuk tahun 2025 dan 2026
* Dokumentasi instalasi lengkap tanpa Docker

---

# 🧰 Teknologi yang Digunakan

## Backend

* PHP
* Laravel
* Laravel Sanctum
* MySQL
* REST API

## Frontend

* React
* Vite
* Bootstrap
* Axios
* Recharts
* Lucide React
* React Hot Toast

## Tools

* Git & GitHub
* Thunder Client / API Testing Tool
* XAMPP
* VS Code

---

# 📌 Studi Kasus Singkat

Sebuah lingkungan RT memiliki 20 rumah, dengan kondisi sebagian rumah dihuni tetap dan sebagian lainnya kosong atau dikontrakkan. RT memiliki iuran bulanan untuk:

* Satpam: Rp. 100.000
* Kebersihan: Rp. 15.000

Selain pemasukan dari iuran, RT juga memiliki pengeluaran rutin dan tidak rutin seperti gaji satpam, petugas kebersihan, perbaikan fasilitas, dan kebutuhan lingkungan lainnya.

Sistem ini dibuat untuk mencatat dan memantau seluruh data tersebut secara terstruktur.

---

# 🗄️ ERD dan Relasi Tabel

## ERD

![ERD Sistem Administrasi RT](media/erd.png)

---

## Relasi Tabel

![Relasi Tabel Sistem Administrasi RT](media/relasi-tabel.png)

---

# 📸 Rangkuman Hasil Tugas dan Screenshot Per Fitur

## 1. Login Admin

Halaman login digunakan admin RT untuk masuk ke dalam sistem.

![Login Admin](media/screenshots/login.png)

---

## 2. Dashboard

Dashboard menampilkan total saldo, total pemasukan, total pengeluaran, total pembayaran, status hunian, statistik RT, quick actions, dan grafik tren.

![Dashboard 1](media/screenshots/dashboard1.png)

![Dashboard 2](media/screenshots/dashboard2.png)

---

## 3. Manajemen Penghuni

Fitur ini digunakan untuk mengelola data penghuni, termasuk tambah, edit, hapus, pencarian, pagination, dan melihat foto KTP.

![Data Penghuni 1](media/screenshots/penghuni1.png)

![Data Penghuni 2](media/screenshots/penghuni2.png)

### Lihat Foto KTP

![Lihat Foto KTP](media/screenshots/lihat-ktp.png)

### Tambah Penghuni

![Tambah Penghuni](media/screenshots/tambah-penghuni.png)

### Edit Penghuni

![Edit Penghuni 1](media/screenshots/edit-penghuni1.png)

![Edit Penghuni 2](media/screenshots/edit-penghuni2.png)

---

## 4. Manajemen Rumah

Fitur ini digunakan untuk mengelola data rumah beserta status rumah.

![Data Rumah 1](media/screenshots/rumah1.png)

![Data Rumah 2](media/screenshots/rumah2.png)

### Tambah Rumah

![Tambah Rumah](media/screenshots/tambah-rumah.png)

### Edit Rumah

![Edit Rumah](media/screenshots/edit-rumah.png)

---

## 5. Detail Rumah

Detail rumah menampilkan informasi rumah, penghuni aktif, form penetapan penghuni, riwayat penghuni rumah, dan riwayat pembayaran berdasarkan rumah.

![Detail Rumah 1](media/screenshots/detail-rumah1.png)

![Detail Rumah 2](media/screenshots/detail-rumah2.png)

---

## 6. Manajemen Pembayaran

Fitur pembayaran digunakan untuk mencatat iuran Satpam dan Kebersihan. Sistem mendukung pembayaran 1 bulan dan pembayaran 12 bulan sekaligus.

![Data Pembayaran 1](media/screenshots/pembayaran1.png)

![Data Pembayaran 2](media/screenshots/pembayaran2.png)

### Tambah Pembayaran

![Tambah Pembayaran](media/screenshots/tambah-pembayaran.png)

### Edit Pembayaran

![Edit Pembayaran](media/screenshots/edit-pembayaran.png)

### Detail Pembayaran

![Detail Pembayaran](media/screenshots/detail-pembayaran.png)

---

## 7. Manajemen Pengeluaran

Fitur pengeluaran digunakan untuk mencatat pengeluaran rutin dan tidak rutin RT.

![Data Pengeluaran 1](media/screenshots/pengeluaran1.png)

![Data Pengeluaran 2](media/screenshots/pengeluaran2.png)

### Tambah Pengeluaran

![Tambah Pengeluaran](media/screenshots/tambah-pengeluaran.png)

### Edit Pengeluaran

![Edit Pengeluaran](media/screenshots/edit-pengeluaran.png)

### Detail Pengeluaran

![Detail Pengeluaran](media/screenshots/detail-pengeluaran.png)

---

## 8. Laporan Keuangan

Fitur laporan digunakan untuk melihat rekapitulasi keuangan berdasarkan tahun dan bulan, termasuk grafik, ringkasan, detail pemasukan, dan detail pengeluaran.

![Laporan 1](media/screenshots/laporan1.png)

![Laporan 2](media/screenshots/laporan2.png)

![Laporan 3](media/screenshots/laporan3.png)

![Laporan 4](media/screenshots/laporan4.png)

![Laporan 5](media/screenshots/laporan5.png)

![Laporan 6](media/screenshots/laporan6.png)

---

# ⚙️ Panduan Instalasi

> Project ini tidak menggunakan Docker. Backend dan frontend dijalankan secara terpisah pada local environment.

---

# 📋 Persyaratan Sistem

Pastikan perangkat sudah memiliki:

* PHP minimal 8.2
* Composer
* Node.js
* NPM
* MySQL
* XAMPP / Laragon / local server sejenis
* Git

---

# 🔧 Instalasi Backend Laravel

## 1. Clone Repository

```bash
git clone https://github.com/mfian16/rt-administrasi.git
cd rt-administrasi
```

---

## 2. Masuk ke Folder Backend

```bash
cd backend
```

---

## 3. Install Dependency Laravel

```bash
composer install
```

---

## 4. Copy File Environment

Untuk Git Bash / Linux / Mac:

```bash
cp .env.example .env
```

Untuk Windows CMD:

```bash
copy .env.example .env
```

---

## 5. Generate Application Key

```bash
php artisan key:generate
```

---

## 6. Buat Database MySQL

Buat database baru di phpMyAdmin atau MySQL client:

```text
rt_administrasi
```

---

## 7. Konfigurasi Database

Edit file `.env` pada folder backend:

```env
APP_NAME="RT Administrasi"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rt_administrasi
DB_USERNAME=root
DB_PASSWORD=
```

Sesuaikan `DB_USERNAME` dan `DB_PASSWORD` dengan konfigurasi MySQL lokal.

---

## 8. Jalankan Migrasi dan Seeder

```bash
php artisan migrate --seed
```

Jika ingin reset database dan mengisi ulang data demo:

```bash
php artisan migrate:fresh --seed
```

---

## 9. Buat Storage Link

Perintah ini wajib dijalankan agar foto KTP dapat diakses dari frontend.

```bash
php artisan storage:link
```

---

## 10. Jalankan Backend Laravel

```bash
php artisan serve
```

Backend akan berjalan di:

```text
http://127.0.0.1:8000
```

---

# 🎨 Instalasi Frontend React

## 1. Buka Terminal Baru

Dari root project:

```bash
cd frontend
```

---

## 2. Install Dependency React

```bash
npm install
```

---

## 3. Cek Konfigurasi API

Pastikan konfigurasi Axios mengarah ke backend Laravel:

```text
http://127.0.0.1:8000/api
```

Biasanya konfigurasi ini berada pada:

```text
frontend/src/api/axios.js
```

---

## 4. Jalankan Frontend

```bash
npm run dev
```

Frontend akan berjalan di:

```text
http://localhost:5173
```

---

# 🔑 Akun Demo

Gunakan akun berikut untuk login:

```text
Email    : admin@example.com
Password : password
```

---

# 🌐 Endpoint API

Base URL:

```text
http://127.0.0.1:8000/api
```

Untuk endpoint yang membutuhkan authentication, gunakan Bearer Token dari hasil login.

Contoh header:

```text
Authorization: Bearer {token}
Accept: application/json
```

---

## Authentication

| Method | Endpoint   | Deskripsi                 |
| ------ | ---------- | ------------------------- |
| POST   | `/login`   | Login admin               |
| POST   | `/logout`  | Logout admin              |
| GET    | `/profile` | Mengambil data user login |

---

## Dashboard

| Method | Endpoint     | Deskripsi                          |
| ------ | ------------ | ---------------------------------- |
| GET    | `/dashboard` | Mengambil data ringkasan dashboard |

---

## Penghuni

| Method | Endpoint              | Deskripsi                                                           |
| ------ | --------------------- | ------------------------------------------------------------------- |
| GET    | `/residents`          | Mengambil data penghuni                                             |
| GET    | `/residents?all=true` | Mengambil semua data penghuni untuk dropdown                        |
| POST   | `/residents`          | Menambahkan data penghuni                                           |
| GET    | `/residents/{id}`     | Mengambil detail penghuni                                           |
| POST   | `/residents/{id}`     | Memperbarui data penghuni menggunakan method spoofing `_method=PUT` |
| DELETE | `/residents/{id}`     | Menghapus data penghuni                                             |

---

## Rumah

| Method | Endpoint           | Deskripsi                                 |
| ------ | ------------------ | ----------------------------------------- |
| GET    | `/houses`          | Mengambil data rumah                      |
| GET    | `/houses?all=true` | Mengambil semua data rumah untuk dropdown |
| POST   | `/houses`          | Menambahkan data rumah                    |
| GET    | `/houses/{id}`     | Mengambil detail rumah                    |
| PUT    | `/houses/{id}`     | Memperbarui data rumah                    |
| DELETE | `/houses/{id}`     | Menghapus data rumah                      |

---

## Riwayat Penghuni Rumah

| Method | Endpoint                         | Deskripsi                             |
| ------ | -------------------------------- | ------------------------------------- |
| GET    | `/house-resident-histories`      | Mengambil data riwayat penghuni rumah |
| POST   | `/house-resident-histories`      | Menetapkan penghuni pada rumah        |
| GET    | `/house-resident-histories/{id}` | Mengambil detail riwayat              |
| PUT    | `/house-resident-histories/{id}` | Memperbarui data riwayat              |
| DELETE | `/house-resident-histories/{id}` | Menghapus data riwayat                |

---

## Iuran

| Method | Endpoint     | Deskripsi                    |
| ------ | ------------ | ---------------------------- |
| GET    | `/fees`      | Mengambil data jenis iuran   |
| POST   | `/fees`      | Menambahkan jenis iuran      |
| GET    | `/fees/{id}` | Mengambil detail jenis iuran |
| PUT    | `/fees/{id}` | Memperbarui jenis iuran      |
| DELETE | `/fees/{id}` | Menghapus jenis iuran        |

---

## Pembayaran

| Method | Endpoint                   | Deskripsi                                       |
| ------ | -------------------------- | ----------------------------------------------- |
| GET    | `/payments`                | Mengambil data pembayaran                       |
| GET    | `/payments?search=&month=` | Filter dan pencarian data pembayaran            |
| POST   | `/payments`                | Menambahkan pembayaran satu bulan               |
| POST   | `/payments/bulk`           | Menambahkan pembayaran beberapa bulan sekaligus |
| GET    | `/payments/{id}`           | Mengambil detail pembayaran                     |
| PUT    | `/payments/{id}`           | Memperbarui data pembayaran                     |
| DELETE | `/payments/{id}`           | Menghapus data pembayaran                       |

---

## Pengeluaran

| Method | Endpoint            | Deskripsi                    |
| ------ | ------------------- | ---------------------------- |
| GET    | `/expenses`         | Mengambil data pengeluaran   |
| GET    | `/expenses?search=` | Mencari data pengeluaran     |
| POST   | `/expenses`         | Menambahkan data pengeluaran |
| GET    | `/expenses/{id}`    | Mengambil detail pengeluaran |
| PUT    | `/expenses/{id}`    | Memperbarui data pengeluaran |
| DELETE | `/expenses/{id}`    | Menghapus data pengeluaran   |

---

## Laporan

| Method | Endpoint                  | Deskripsi                           |
| ------ | ------------------------- | ----------------------------------- |
| GET    | `/reports/yearly-summary` | Mengambil ringkasan laporan tahunan |
| GET    | `/reports/monthly-detail` | Mengambil detail laporan bulanan    |

---

# 🧪 API Testing

Pengujian API dapat dilakukan menggunakan Thunder Client, Postman, Insomnia, atau API client lain.

Pada proses pengembangan project ini, API diuji menggunakan Thunder Client di VS Code.

---

# 📂 Struktur Project

```text
rt-administrasi/
│
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── public/
│   ├── storage/
│   ├── .env.example
│   ├── composer.json
│   └── artisan
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── media/
│   ├── erd.png
│   ├── relasi-tabel.png
│   └── screenshots/
│
└── README.md
```

---

# 🧠 Catatan Teknis

* Backend dan frontend dibuat secara terpisah.
* Backend menggunakan Laravel Sanctum untuk authentication token.
* Frontend mengakses API menggunakan Axios.
* Project tidak menggunakan Docker.
* Database menggunakan MySQL.
* Seeder menyediakan data demo penghuni, rumah, iuran, pembayaran, dan pengeluaran.
* Fitur pembayaran 12 bulan menggunakan endpoint bulk payment.
* File foto KTP menggunakan Laravel storage, sehingga `php artisan storage:link` wajib dijalankan.
* File `.env`, `vendor`, `node_modules`, dan `public/storage` tidak disertakan ke repository.

---

# 🧪 Alur Testing Singkat

Setelah backend dan frontend berjalan, lakukan pengujian berikut:

1. Login menggunakan akun demo.
2. Cek dashboard.
3. Tambah, edit, dan hapus data penghuni.
4. Upload dan lihat foto KTP penghuni.
5. Tambah, edit, dan hapus data rumah.
6. Buka detail rumah dan tetapkan penghuni.
7. Tambah pembayaran satu bulan.
8. Tambah pembayaran 12 bulan sekaligus.
9. Edit dan hapus pembayaran.
10. Tambah, edit, dan hapus pengeluaran.
11. Cek laporan berdasarkan tahun dan bulan.
12. Logout.

---

# 👤 Author

**Muhammad Fiqih Irfiansyah**

Fresh Graduate Informatika

Junior Web Developer Enthusiast

GitHub:
https://github.com/mfian16
