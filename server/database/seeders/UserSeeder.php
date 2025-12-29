<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Department;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create departments first
        $measuring = Department::firstOrCreate(['name' => 'Measuring Room']);
        $receiving = Department::firstOrCreate(['name' => 'Receiving Department']);
        $adminDept = Department::firstOrCreate(['name' => 'Administration']);

        // Measuring Workers
        User::factory()->count(5)->create([
            'role' => 'measuring_worker',
            'department_id' => $measuring->id
        ]);

        // Receiving Workers
        User::factory()->count(3)->create([
            'role' => 'receiving_worker',
            'department_id' => $receiving->id
        ]);

        // Managers
        User::factory()->count(2)->create([
            'role' => 'manager',
            'department_id' => $adminDept->id
        ]);

        // Admins
        User::factory()->count(1)->create([
            'role' => 'admin',
            'department_id' => $adminDept->id
        ]);
    }
}

