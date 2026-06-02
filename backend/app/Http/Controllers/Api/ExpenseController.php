<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $query = Expense::with('user');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('expense_title', 'like', '%' . $request->search . '%')
                  ->orWhere('expense_type', 'like', '%' . $request->search . '%')
                  ->orWhere('expense_date', 'like', '%' . $request->search . '%')
                  ->orWhere('expense_description', 'like', '%' . $request->search . '%');
            });
        }

        return response()->json([
            'data' => $query->orderByDesc('expense_date')->orderByDesc('id')->latest()->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'expense_title' => 'required|string|max:255',
            'expense_type' => 'required|in:rutin,tidak_rutin',
            'expense_amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'expense_description' => 'nullable|string',
        ]);

        $validated['user_id'] = $request->user()->id;

        $expense = Expense::create($validated);

        return response()->json([
            'message' => 'Data pengeluaran berhasil ditambahkan',
            'data' => $expense->load('user')
        ], 201);
    }

    public function show(Expense $expense)
    {
        return response()->json([
            'data' => $expense->load('user')
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'expense_title' => 'required|string|max:255',
            'expense_type' => 'required|in:rutin,tidak_rutin',
            'expense_amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'expense_description' => 'nullable|string',
        ]);

        $expense->update($validated);

        return response()->json([
            'message' => 'Data pengeluaran berhasil diperbarui',
            'data' => $expense->load('user')
        ]);
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        return response()->json([
            'message' => 'Data pengeluaran berhasil dihapus'
        ]);
    }
}