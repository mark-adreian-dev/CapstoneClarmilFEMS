<?php

namespace Database\Seeders;

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
            UserSeeder::class,
        ]);

        // Seed departments
        $this->call([
            DepartmentSeeder::class,
        ]);

        // Seed premixes
        $this->call([
            PremixSeeder::class,
        ]);

        // // Seed barcodes
        // $this->call([
        //     BarcodeSeeder::class,
        // ]);

        // Seed work sessions
        $this->call([
            WorkSessionSeeder::class,
        ]);

        // Seed operation configs
        $this->call([
            OperationConfigSeeder::class,
        ]);
    }
}
