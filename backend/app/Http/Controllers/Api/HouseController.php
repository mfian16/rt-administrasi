<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\House;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    public function index(Request $request)
    {
        $query = House::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('house_number', 'like', '%' . $request->search . '%')
                  ->orWhere('house_status', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->all === 'true') {
            return response()->json([
                'data' => $query->orderBy('house_number')->get()
            ]);
        }
        
        return response()->json([
            'data' => $query->orderBy('house_number', 'asc')->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'house_number' => 'required|string|max:50|unique:houses,house_number',
            'house_status' => 'required|in:dihuni,tidak_dihuni',
        ]);

        $house = House::create($validated);

        return response()->json([
            'message' => 'Data rumah berhasil ditambahkan',
            'data' => $house
        ], 201);
    }

    public function show(House $house)
    {
        return response()->json([
            'data' => $house->load([
                'houseResidentHistories.resident',
                'payments.resident',
                'payments.fee',
            ]),
            'active_resident_history' => $house->houseResidentHistories()
                ->with('resident')
                ->where('is_active', true)
                ->latest()
                ->first(),
        ]);
    }

    public function update(Request $request, House $house)
    {
        $validated = $request->validate([
            'house_number' => 'required|string|max:50|unique:houses,house_number,' . $house->id,
            'house_status' => 'required|in:dihuni,tidak_dihuni',
        ]);

        $house->update($validated);

        return response()->json([
            'message' => 'Data rumah berhasil diperbarui',
            'data' => $house
        ]);
    }

    public function destroy(House $house)
    {
        $house->delete();

        return response()->json([
            'message' => 'Data rumah berhasil dihapus'
        ]);
    }
}