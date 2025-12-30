<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'employee_id',
        'first_name',
        'last_name',
        'middle_name',
        'suffix',
        'email',
        'password',
        'role',
        'address',
        'contact_number',
        'sex',
        'department_id',
        'plain_password',
        'birthdate'
    ];

    protected $hidden = ['password'];

    public function workSessions()
    {
        return $this->hasMany(WorkSession::class);
    }

    public function scannedBarcodes()
    {
        return $this->hasMany(Barcode::class, 'scanned_by');
    }

    public function verifiedBarcodes()
    {
        return $this->hasMany(Barcode::class, 'verified_by');
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    // Inside User.php
    public function loadStation()
    {
        return $this->load('station');
    }
}

