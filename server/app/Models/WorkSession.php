<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'start_time',
        'end_time',
        'actual_work_duration_minutes',
        'idle_minutes',
        'total_output',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
