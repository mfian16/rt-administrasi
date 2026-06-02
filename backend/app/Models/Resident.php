<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = [
        'full_name',
        'ktp_photo',
        'resident_status',
        'marital_status',
        'phone_number',
    ];

    protected $appends = ['ktp_photo_url'];

    public function getKtpPhotoUrlAttribute()
    {
        if (!$this->ktp_photo) {
            return null;
        }
        return asset('storage/' . $this->ktp_photo);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function houseResidentHistories()
    {
        return $this->hasMany(HouseResidentHistory::class);
    }
}
