<?php

namespace Database\Seeders;

use App\Models\Station;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Department;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create departments first
        $measuring = Station::where('name', 'Measuring Room')->first();
        $receiving = Station::where('name', 'Receiving Department')->first();
        $adminDept = Station::where('name', 'Management Committee')->first();
        
        // Measuring Workers
        User::factory()->count(100)->create([
            'role' => 'measuring_worker',
            'station_id' => $measuring->id
        ]);

        // Receiving Workers
        User::factory()->count(100)->create([
            'role' => 'receiving_worker',
            'station_id' => $receiving->id
        ]);

        // Managers
        User::factory()->count(10)->create([
            'role' => 'manager',
            'station_id' => $adminDept->id
        ]);

        // Admins
        User::factory()->count(5)->create([
            'role' => 'admin',
            'station_id' => $adminDept->id
        ]);
    }
}

