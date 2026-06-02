<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['user', 'resident', 'house', 'fee']);

        if ($request->month) {
            $query->where('payment_month', $request->month);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('payment_year', 'like', '%' . $request->search . '%')
                  ->orWhere('payment_status', 'like', '%' . $request->search . '%')
                  ->orWhereHas('resident', function ($residentQuery) use ($request) {
                        $residentQuery->where('full_name', 'like', '%' . $request->search . '%');
                  })
                  ->orWhereHas('house', function ($houseQuery) use ($request) {
                        $houseQuery->where('house_number', 'like', '%' . $request->search . '%');
                  })
                  ->orWhereHas('fee', function ($feeQuery) use ($request) {
                        $feeQuery->where('fee_type', 'like', '%' . $request->search . '%');
                  });
            });
        }

        return response()->json([
            'data' => $query
                ->orderByDesc('payment_year')
                ->orderByDesc('payment_month')
                ->orderByDesc('payment_date')
                ->orderByDesc('id')
                ->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'house_id' => 'required|exists:houses,id',
            'fee_id' => 'required|exists:fees,id',
            'payment_month' => 'required|integer|min:1|max:12',
            'payment_year' => 'required|digits:4',
            'paid_amount' => 'required|numeric|min:0',
            'payment_date' => 'nullable|date',
            'payment_status' => 'required|in:lunas,belum_lunas',
            'payment_description' => 'nullable|string',
        ]);
        
        $exists = Payment::where('house_id', $validated['house_id'])
            ->where('fee_id', $validated['fee_id'])
            ->where('payment_month', $validated['payment_month'])
            ->where('payment_year', $validated['payment_year'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Iuran sudah dibayarkan untuk rumah dan periode tersebut'
            ], 422);
        }
        
        $validated['user_id'] = $request->user()->id;

        $payment = Payment::create($validated);

        return response()->json([
            'message' => 'Data pembayaran berhasil ditambahkan',
            'data' => $payment->load(['user', 'resident', 'house', 'fee'])
        ], 201);
    }

    public function show(Payment $payment)
    {
        return response()->json([
            'data' => $payment->load(['user', 'resident', 'house', 'fee'])
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'house_id' => 'required|exists:houses,id',
            'fee_id' => 'required|exists:fees,id',
            'payment_month' => 'required|integer|min:1|max:12',
            'payment_year' => 'required|digits:4',
            'paid_amount' => 'required|numeric|min:0',
            'payment_date' => 'nullable|date',
            'payment_status' => 'required|in:lunas,belum_lunas',
            'payment_description' => 'nullable|string',
        ]);

        $payment->update($validated);

        return response()->json([
            'message' => 'Data pembayaran berhasil diperbarui',
            'data' => $payment->load(['user', 'resident', 'house', 'fee'])
        ]);
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();

        return response()->json([
            'message' => 'Data pembayaran berhasil dihapus'
        ]);
    }

    public function bulkStore(Request $request)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'house_id' => 'required|exists:houses,id',
            'fee_id' => 'required|exists:fees,id',
            'start_month' => 'required|integer|min:1|max:12',
            'end_month' => 'required|integer|min:1|max:12|gte:start_month',
            'payment_year' => 'required|digits:4',
            'paid_amount' => 'required|numeric|min:0',
            'payment_date' => 'nullable|date',
            'payment_status' => 'required|in:lunas,belum_lunas',
            'payment_description' => 'nullable|string',
        ]);

        $createdPayments = [];

        for ($month = $validated['start_month']; $month <= $validated['end_month']; $month++) {
            $exists = Payment::where('house_id', $validated['house_id'])
                ->where('fee_id', $validated['fee_id'])
                ->where('payment_month', $month)
                ->where('payment_year', $validated['payment_year'])
                ->exists();

            if ($exists) {
                continue;
            }

            $createdPayments[] = Payment::create([
                'user_id' => $request->user()->id,
                'resident_id' => $validated['resident_id'],
                'house_id' => $validated['house_id'],
                'fee_id' => $validated['fee_id'],
                'payment_month' => $month,
                'payment_year' => $validated['payment_year'],
                'paid_amount' => $validated['paid_amount'],
                'payment_date' => $validated['payment_date'],
                'payment_status' => $validated['payment_status'],
                'payment_description' => $validated['payment_description'],
            ]);
        }

        return response()->json([
            'message' => 'Data pembayaran beberapa bulan berhasil ditambahkan',
            'created_count' => count($createdPayments),
            'data' => $createdPayments
        ], 201);
    }
}