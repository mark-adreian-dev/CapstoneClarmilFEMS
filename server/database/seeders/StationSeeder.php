<?php

namespace Database\Seeders;

use App\Models\Station;
use Illuminate\Database\Seeder;

class StationSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'Measuring Room', 'description' => 'Responsible for preparing dry ingredients.'],
            ['name' => 'Processing Department', 'description' => 'Verifies scanned barcodes for authenticity.'],
            ['name' => 'Receiving Department', 'description' => 'Handles incoming raw materials.'],
            ['name' => 'Management Committee', 'description' => 'Manages employee accounts and operations.']
        ];

        foreach ($departments as $dept) {
            Station::firstOrCreate(['name' => $dept['name']], $dept);
        }
    }
}

