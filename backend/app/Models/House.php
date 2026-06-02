<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    protected $fillable = [
        'house_number',
        'house_status',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function houseResidentHistories()
    {
        return $this->hasMany(HouseResidentHistory::class);
    }
}
