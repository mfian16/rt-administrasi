<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'resident_id',
        'house_id',
        'fee_id',
        'payment_month',
        'payment_year',
        'paid_amount',
        'payment_date',
        'payment_status',
        'payment_description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function fee()
    {
        return $this->belongsTo(Fee::class);
    }
}
