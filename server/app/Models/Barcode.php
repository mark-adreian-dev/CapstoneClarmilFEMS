<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barcode extends Model
{
    use HasFactory;

    protected $fillable = [
        'barcode_value',
        'premix_id',
        'status',
        'qr_image_path',
        'scanned_at',
        'scanned_by',
        'verified_at',
        'verified_by',
        'department_id'
    ];

    public function premix()
    {
        return $this->belongsTo(Premix::class);
    }

    public function scannedBy()
    {
        return $this->belongsTo(User::class, 'scanned_by');
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
