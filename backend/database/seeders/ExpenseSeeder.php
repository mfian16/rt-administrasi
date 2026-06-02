<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();

        for ($month = 1; $month <= 12; $month++) {
            Expense::create([
                'user_id' => $admin->id,
                'expense_title' => 'Gaji Satpam ' . $this->monthName($month),
                'expense_type' => 'rutin',
                'expense_amount' => 900000,
                'expense_date' => '2025-' . str_pad($month, 2, '0', STR_PAD_LEFT) . '-10',
                'expense_description' => 'Pembayaran gaji satpam lingkungan RT bulan ' . $this->monthName($month) . ' 2025',
            ]);

            Expense::create([
                'user_id' => $admin->id,
                'expense_title' => 'Petugas Kebersihan ' . $this->monthName($month),
                'expense_type' => 'rutin',
                'expense_amount' => 300000,
                'expense_date' => '2025-' . str_pad($month, 2, '0', STR_PAD_LEFT) . '-11',
                'expense_description' => 'Pembayaran petugas kebersihan lingkungan RT bulan ' . $this->monthName($month) . ' 2025',
            ]);

            if (in_array($month, [3, 6, 9, 12])) {
                Expense::create([
                    'user_id' => $admin->id,
                    'expense_title' => 'Perawatan Fasilitas RT ' . $this->monthName($month),
                    'expense_type' => 'tidak_rutin',
                    'expense_amount' => 250000,
                    'expense_date' => '2025-' . str_pad($month, 2, '0', STR_PAD_LEFT) . '-20',
                    'expense_description' => 'Biaya perawatan fasilitas lingkungan RT bulan ' . $this->monthName($month) . ' 2025',
                ]);
            }
        }

        $expenses2026 = [
            ['Gaji Satpam Januari', 'rutin', 900000, '2026-01-10', 'Pembayaran gaji satpam lingkungan RT bulan Januari 2026'],
            ['Petugas Kebersihan Januari', 'rutin', 300000, '2026-01-11', 'Pembayaran petugas kebersihan lingkungan RT bulan Januari 2026'],
            ['Perbaikan Lampu Jalan', 'tidak_rutin', 200000, '2026-01-18', 'Penggantian lampu jalan depan blok B'],
            ['Gaji Satpam Februari', 'rutin', 900000, '2026-02-10', 'Pembayaran gaji satpam lingkungan RT bulan Februari 2026'],
            ['Petugas Kebersihan Februari', 'rutin', 300000, '2026-02-11', 'Pembayaran petugas kebersihan lingkungan RT bulan Februari 2026'],
            ['Perbaikan Selokan', 'tidak_rutin', 250000, '2026-02-20', 'Perbaikan selokan depan rumah A-04 sampai A-06'],
            ['Gaji Satpam Maret', 'rutin', 900000, '2026-03-10', 'Pembayaran gaji satpam lingkungan RT bulan Maret 2026'],
            ['Petugas Kebersihan Maret', 'rutin', 300000, '2026-03-11', 'Pembayaran petugas kebersihan lingkungan RT bulan Maret 2026'],
        ];

        foreach ($expenses2026 as $expense) {
            Expense::create([
                'user_id' => $admin->id,
                'expense_title' => $expense[0],
                'expense_type' => $expense[1],
                'expense_amount' => $expense[2],
                'expense_date' => $expense[3],
                'expense_description' => $expense[4],
            ]);
        }
    }

    private function monthName(int $month): string
    {
        return [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember',
        ][$month];
    }
}