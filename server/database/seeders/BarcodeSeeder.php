<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barcode;
use App\Models\Ingridient;
use App\Models\Station;

class BarcodeSeeder extends Seeder
{
    public function run(): void
    {
        $measuring = Station::where('name', 'Measuring Room')->first();
        $premixes = Ingridient::all();

        if ($premixes->isEmpty()) {
            $premixes = Ingridient::factory(5)->create();
        }

        foreach ($premixes as $premix) {
            Barcode::factory()->count(5)->create([
                'premix_id' => $premix->id,
                'station_id' => $measuring->id,
            ]);
        }
    }
}
