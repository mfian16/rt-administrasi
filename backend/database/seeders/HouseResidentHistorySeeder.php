<?php

namespace Database\Seeders;

use App\Models\House;
use App\Models\HouseResidentHistory;
use App\Models\Resident;
use Illuminate\Database\Seeder;

class HouseResidentHistorySeeder extends Seeder
{
    public function run(): void
    {
        $residents = Resident::orderBy('id')->get();
        $houses = House::orderBy('id')->get();

        foreach ($residents->take(15) as $index => $resident) {
            HouseResidentHistory::create([
                'resident_id' => $resident->id,
                'house_id' => $houses[$index]->id,
                'start_date' => '2026-01-01',
                'end_date' => null,
                'is_active' => true,
            ]);
        }

        HouseResidentHistory::create([
            'resident_id' => $residents[15]->id,
            'house_id' => $houses[15]->id,
            'start_date' => '2026-02-01',
            'end_date' => '2026-05-31',
            'is_active' => false,
        ]);
    }
}