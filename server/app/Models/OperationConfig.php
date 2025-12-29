<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperationConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_time',
        'end_time',
        'daily_quota',
        'is_active',
    ];
}
