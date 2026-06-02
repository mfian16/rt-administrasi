<?php

namespace Database\Seeders;

use App\Models\Fee;
use App\Models\House;
use App\Models\Payment;
use App\Models\Resident;
use App\Models\User;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();
        $satpam = Fee::where('fee_type', 'Satpam')->first();
        $kebersihan = Fee::where('fee_type', 'Kebersihan')->first();

        $residents = Resident::orderBy('id')->take(15)->get();
        $houses = House::orderBy('id')->take(15)->get();

        $paymentYears = [
            2025 => range(1, 12),
            2026 => range(1, 3),
        ];

        foreach ($paymentYears as $year => $months) {
            foreach ($residents as $index => $resident) {
                foreach ($months as $month) {
                    Payment::create([
                        'user_id' => $admin->id,
                        'resident_id' => $resident->id,
                        'house_id' => $houses[$index]->id,
                        'fee_id' => $satpam->id,
                        'payment_month' => $month,
                        'payment_year' => $year,
                        'paid_amount' => 100000,
                        'payment_date' => $year . '-' . str_pad($month, 2, '0', STR_PAD_LEFT) . '-05',
                        'payment_status' => 'lunas',
                        'payment_description' => 'Pembayaran iuran Satpam bulan ' . $this->monthName($month) . ' ' . $year,
                    ]);

                    Payment::create([
                        'user_id' => $admin->id,
                        'resident_id' => $resident->id,
                        'house_id' => $houses[$index]->id,
                        'fee_id' => $kebersihan->id,
                        'payment_month' => $month,
                        'payment_year' => $year,
                        'paid_amount' => 15000,
                        'payment_date' => $year . '-' . str_pad($month, 2, '0', STR_PAD_LEFT) . '-05',
                        'payment_status' => 'lunas',
                        'payment_description' => 'Pembayaran iuran Kebersihan bulan ' . $this->monthName($month) . ' ' . $year,
                    ]);
                }
            }
        }

        foreach ($residents->slice(10, 5)->values() as $index => $resident) {
            Payment::create([
                'user_id' => $admin->id,
                'resident_id' => $resident->id,
                'house_id' => $houses[$index + 10]->id,
                'fee_id' => $satpam->id,
                'payment_month' => 4,
                'payment_year' => 2026,
                'paid_amount' => 100000,
                'payment_date' => null,
                'payment_status' => 'belum_lunas',
                'payment_description' => 'Iuran Satpam bulan April 2026 belum dibayarkan',
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