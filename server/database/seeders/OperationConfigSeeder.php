<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OperationConfig;

class OperationConfigSeeder extends Seeder
{
    public function run(): void
    {
        OperationConfig::firstOrCreate([
            'start_time' => '06:00:00',
            'end_time' => '14:00:00',
            'daily_quota' => 400,
            'is_active' => true,
        ]);
    }
}

