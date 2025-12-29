<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'Measuring Room', 'description' => 'Responsible for preparing dry ingredients.'],
            ['name' => 'Receiving Department', 'description' => 'Verifies scanned barcodes for authenticity.'],
            ['name' => 'Quality Control', 'description' => 'Checks product quality.'],
            ['name' => 'Administration', 'description' => 'Manages employee accounts and operations.']
        ];

        foreach ($departments as $dept) {
            Department::firstOrCreate(['name' => $dept['name']], $dept);
        }
    }
}

