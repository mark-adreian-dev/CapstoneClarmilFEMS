<?php

namespace Database\Seeders;

use App\Models\Station;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
     

        // Seed users first (workers, managers, admins)
        $this->call([
            StationSeeder::class,
            UserSeeder::class,
            PremixSeeder::class,
        //  BarcodeSeeder::class,
            WorkSessionSeeder::class,
            OperationConfigSeeder::class,
        ]);
    }
}
