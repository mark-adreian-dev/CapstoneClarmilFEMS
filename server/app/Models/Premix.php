<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Premix extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'unit',
    ];

    public function barcodes()
    {
        return $this->hasMany(Barcode::class);
    }
}
