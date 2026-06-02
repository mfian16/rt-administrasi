<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    protected $fillable = [
        'fee_type',
        'fee_amount',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
