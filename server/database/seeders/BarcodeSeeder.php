<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barcode;
use App\Models\Premix;
use App\Models\Department;
use App\Models\User;

class BarcodeSeeder extends Seeder
{
    public function run(): void
    {
        $measuringDept = Department::firstOrCreate(['name' => 'Measuring Room']);
        $receivingDept = Department::firstOrCreate(['name' => 'Receiving Department']);

        $premixes = Premix::all();

        if ($premixes->isEmpty()) {
            $premixes = Premix::factory(5)->create();
        }

        foreach ($premixes as $premix) {
            Barcode::factory()->count(5)->create([
                'premix_id' => $premix->id,
                'department_id' => $measuringDept->id,
            ]);
        }
    }
}
