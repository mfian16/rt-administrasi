<?php

namespace Database\Seeders;

use App\Models\Resident;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    public function run(): void
    {
        $residents = [
            ['Rina Setiawan', 'tetap', 'menikah', '085854614472'],
            ['Fatur Rahman', 'tetap', 'menikah', '085853566493'],
            ['Budi Santoso', 'tetap', 'menikah', '081234567898'],
            ['Dewi Lestari', 'tetap', 'menikah', '082233445566'],
            ['Agus Pratama', 'tetap', 'menikah', '081298765432'],
            ['Siti Aminah', 'tetap', 'menikah', '087712345678'],
            ['Andi Wijaya', 'tetap', 'menikah', '085733221100'],
            ['Maya Sari', 'tetap', 'belum_menikah', '089612345001'],
            ['Rizky Maulana', 'tetap', 'belum_menikah', '081331234567'],
            ['Nina Kartika', 'tetap', 'menikah', '085645678901'],
            ['Hendra Saputra', 'tetap', 'menikah', '082145678900'],
            ['Lina Wulandari', 'tetap', 'menikah', '081998877665'],
            ['Dimas Nugroho', 'tetap', 'belum_menikah', '085234567890'],
            ['Taufik Hidayat', 'tetap', 'menikah', '081556677889'],
            ['Putri Anggraini', 'tetap', 'belum_menikah', '087855443322'],
            ['Bayu Prakoso', 'kontrak', 'menikah', '081122334455'],
            ['Citra Permata', 'kontrak', 'belum_menikah', '085699887766'],
            ['Yoga Firmansyah', 'kontrak', 'menikah', '082112223333'],
        ];

        foreach ($residents as $resident) {
            Resident::create([
                'full_name' => $resident[0],
                'resident_status' => $resident[1],
                'marital_status' => $resident[2],
                'phone_number' => $resident[3],
                'ktp_photo' => 'ktp/example-ktp.jpg',
            ]);
        }
    }
}