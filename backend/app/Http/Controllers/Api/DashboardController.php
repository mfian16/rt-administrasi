<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resident;
use App\Models\House;
use App\Models\Payment;
use App\Models\Expense;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $latestPaymentDate = Payment::max('payment_date');
        $latestExpenseDate = Expense::max('expense_date');

        $latestDate = collect([$latestPaymentDate, $latestExpenseDate])
            ->filter()
            ->max();

        $endDate = $latestDate ? Carbon::parse($latestDate) : now();
        $startDate = $endDate->copy()->subMonths(5);

        $chartData = [];

        for ($date = $startDate->copy(); $date <= $endDate; $date->addMonth()) {
            $month = (int) $date->format('m');
            $year = (int) $date->format('Y');

            $income = Payment::where('payment_status', 'lunas')
                ->where('payment_month', $month)
                ->where('payment_year', $year)
                ->sum('paid_amount');

            $expense = Expense::whereMonth('expense_date', $month)
                ->whereYear('expense_date', $year)
                ->sum('expense_amount');

            $chartData[] = [
                'month' => $date->translatedFormat('M Y'),
                'income' => (float) $income,
                'expense' => (float) $expense,
                'balance' => (float) $income - (float) $expense,
            ];
        }

        return response()->json([
            'data' => [
                'total_residents' => Resident::count(),
                'total_houses' => House::count(),
                'occupied_houses' => House::where('house_status', 'dihuni')->count(),
                'vacant_houses' => House::where('house_status', 'tidak_dihuni')->count(),

                'total_income' => Payment::where('payment_status', 'lunas')->sum('paid_amount'),
                'total_expense' => Expense::sum('expense_amount'),
                'remaining_balance' =>
                    Payment::where('payment_status', 'lunas')->sum('paid_amount') - Expense::sum('expense_amount'),

                'total_payments' => Payment::count(),

                'cash_trend' => $chartData,

                'latest_payments' => Payment::with(['resident', 'house', 'fee'])
                    ->whereNotNull('payment_date')
                    ->orderByDesc('payment_date')
                    ->latest()
                    ->take(5)
                    ->get(),

                'latest_expenses' => Expense::orderByDesc('expense_date')
                    ->take(5)
                    ->get(),
            ]
        ]);
    }
}