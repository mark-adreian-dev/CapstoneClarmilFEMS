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
        'name',
        'email',
        'password',
        'role',
        'department_id'
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

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}

