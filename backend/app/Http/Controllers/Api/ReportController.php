<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Expense;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function yearlySummary(Request $request)
    {
        $year = $request->year ?? now()->year;

        $data = [];

        for ($month = 1; $month <= 12; $month++) {

            $income = Payment::where('payment_status', 'lunas')
                ->where('payment_year', $year)
                ->where('payment_month', $month)
                ->sum('paid_amount');

            $expense = Expense::whereYear('expense_date', $year)
                ->whereMonth('expense_date', $month)
                ->sum('expense_amount');

            $data[] = [
                'month' => $month,
                'income' => $income,
                'expense' => $expense,
                'balance' => $income - $expense,
            ];
        }

        return response()->json([
            'year' => $year,
            'data' => $data
        ]);
    }

    public function monthlyDetail(Request $request)
    {
        $validated = $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|digits:4',
        ]);

        $month = $validated['month'];
        $year = $validated['year'];

        $payments = Payment::with(['resident', 'house', 'fee'])
            ->where('payment_status', 'lunas')
            ->where('payment_month', $month)
            ->where('payment_year', $year)
            ->latest()
            ->get();

        $expenses = Expense::whereYear('expense_date', $year)
            ->whereMonth('expense_date', $month)
            ->latest()
            ->get();

        $income = $payments->sum('paid_amount');
        $expense = $expenses->sum('expense_amount');

        return response()->json([
            'month' => $month,
            'year' => $year,
            'summary' => [
                'income' => $income,
                'expense' => $expense,
                'balance' => $income - $expense,
            ],
            'payments' => $payments,
            'expenses' => $expenses,
        ]);
    }
}