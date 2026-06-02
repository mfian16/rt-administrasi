<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\House;
use App\Models\HouseResidentHistory;
use Illuminate\Http\Request;

class HouseResidentHistoryController extends Controller
{
    public function index(Request $request)
    {
        $query = HouseResidentHistory::with(['resident', 'house']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('start_date', 'like', '%' . $request->search . '%')
                  ->orWhere('end_date', 'like', '%' . $request->search . '%')
                  ->orWhereHas('resident', function ($residentQuery) use ($request) {
                        $residentQuery->where('full_name', 'like', '%' . $request->search . '%');
                  })
                  ->orWhereHas('house', function ($houseQuery) use ($request) {
                        $houseQuery->where('house_number', 'like', '%' . $request->search . '%');
                  });
            });
        }

        return response()->json([
            'data' => $query->latest()->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'house_id' => 'required|exists:houses,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'required|boolean',
        ]);

        if ($validated['is_active']) {
            HouseResidentHistory::where('house_id', $validated['house_id'])
                ->where('is_active', true)
                ->update([
                    'is_active' => false,
                    'end_date' => $validated['start_date'],
                ]);

            House::where('id', $validated['house_id'])->update([
                'house_status' => 'dihuni',
            ]);
        }

        $history = HouseResidentHistory::create($validated);

        return response()->json([
            'message' => 'Riwayat penghuni rumah berhasil ditambahkan',
            'data' => $history->load(['resident', 'house'])
        ], 201);
    }

    public function show(HouseResidentHistory $houseResidentHistory)
    {
        return response()->json([
            'data' => $houseResidentHistory->load(['resident', 'house'])
        ]);
    }

    public function update(Request $request, HouseResidentHistory $houseResidentHistory)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'house_id' => 'required|exists:houses,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'required|boolean',
        ]);

        if ($validated['is_active']) {
            HouseResidentHistory::where('house_id', $validated['house_id'])
                ->where('id', '!=', $houseResidentHistory->id)
                ->where('is_active', true)
                ->update([
                    'is_active' => false,
                    'end_date' => $validated['start_date'],
                ]);
        }

        $houseResidentHistory->update($validated);

        House::where('id', $validated['house_id'])->update([
            'house_status' => $validated['is_active'] ? 'dihuni' : 'tidak_dihuni',
        ]);

        return response()->json([
            'message' => 'Riwayat penghuni rumah berhasil diperbarui',
            'data' => $houseResidentHistory->load(['resident', 'house'])
        ]);
    }

    public function destroy(HouseResidentHistory $houseResidentHistory)
    {
        $houseId = $houseResidentHistory->house_id;

        $houseResidentHistory->delete();

        $hasActiveResident = HouseResidentHistory::where('house_id', $houseId)
            ->where('is_active', true)
            ->exists();

        House::where('id', $houseId)->update([
            'house_status' => $hasActiveResident ? 'dihuni' : 'tidak_dihuni',
        ]);

        return response()->json([
            'message' => 'Riwayat penghuni rumah berhasil dihapus'
        ]);
    }
}