<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Fee;

class FeeSeeder extends Seeder
{
    public function run(): void
    {
        Fee::insert([
            [
                'fee_type' => 'Satpam',
                'fee_amount' => 100000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fee_type' => 'Kebersihan',
                'fee_amount' => 15000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
