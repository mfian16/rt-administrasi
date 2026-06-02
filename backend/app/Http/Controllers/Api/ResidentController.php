<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resident;
use Illuminate\Http\Request;

class ResidentController extends Controller
{
    public function index(Request $request)
    {
        $query = Resident::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('full_name', 'like', '%' . $request->search . '%')
                  ->orWhere('phone_number', 'like', '%' . $request->search . '%');
            });
        }
        
        if ($request->all === 'true') {
            return response()->json([
                'data' => $query->orderBy('full_name')->get()
            ]);
        }

        return response()->json([
            'data' => $query->latest()->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'ktp_photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'resident_status' => 'required|in:tetap,kontrak',
            'marital_status' => 'required|in:menikah,belum_menikah',
            'phone_number' => 'required|string|max:20',
        ]);

        if ($request->hasFile('ktp_photo')) {
            $path = $request->file('ktp_photo')
                ->store('ktp', 'public');

            $validated['ktp_photo'] = $path;
        }

        $resident = Resident::create($validated);

        return response()->json([
            'message' => 'Data penghuni berhasil ditambahkan',
            'data' => $resident
        ], 201);
    }

    public function show(Resident $resident)
    {
        return response()->json([
            'data' => $resident
        ]);
    }

    public function update(Request $request, Resident $resident)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'ktp_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'resident_status' => 'required|in:tetap,kontrak',
            'marital_status' => 'required|in:menikah,belum_menikah',
            'phone_number' => 'required|string|max:20',
        ]);

        if ($request->hasFile('ktp_photo')) {
            $path = $request->file('ktp_photo')->store('ktp', 'public');
            $validated['ktp_photo'] = $path;
        } else {
            unset($validated['ktp_photo']);
        }

        $resident->update($validated);

        return response()->json([
            'message' => 'Data penghuni berhasil diperbarui',
            'data' => $resident
        ]);
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();

        return response()->json([
            'message' => 'Data penghuni berhasil dihapus'
        ]);
    }
}