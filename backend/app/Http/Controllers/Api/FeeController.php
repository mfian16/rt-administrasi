<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fee;
use Illuminate\Http\Request;

class FeeController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Fee::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fee_type' => 'required|string|max:100',
            'fee_amount' => 'required|numeric|min:0',
        ]);

        $fee = Fee::create($validated);

        return response()->json([
            'message' => 'Data iuran berhasil ditambahkan',
            'data' => $fee
        ], 201);
    }

    public function show(Fee $fee)
    {
        return response()->json([
            'data' => $fee
        ]);
    }

    public function update(Request $request, Fee $fee)
    {
        $validated = $request->validate([
            'fee_type' => 'required|string|max:100',
            'fee_amount' => 'required|numeric|min:0',
        ]);

        $fee->update($validated);

        return response()->json([
            'message' => 'Data iuran berhasil diperbarui',
            'data' => $fee
        ]);
    }

    public function destroy(Fee $fee)
    {
        $fee->delete();

        return response()->json([
            'message' => 'Data iuran berhasil dihapus'
        ]);
    }
}