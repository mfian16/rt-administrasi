# Backend - Sistem Administrasi RT

Backend aplikasi Sistem Administrasi RT dibuat menggunakan Laravel dan MySQL.

Backend ini menyediakan REST API untuk kebutuhan autentikasi, dashboard, data penghuni, rumah, pembayaran, pengeluaran, riwayat penghuni rumah, dan laporan.

## Tech Stack

- PHP
- Laravel
- Laravel Sanctum
- MySQL
- REST API

## Instalasi Singkat

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve