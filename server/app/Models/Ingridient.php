<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingridient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image_path',
        'description',
        'unit',
        'stock_quantity',
        'type',
        'reorder_level',
        'unit_cost',
        'expiration_date'
    ];

    public function barcodes()
    {
        return $this->hasMany(Barcode::class);
    }
}
