<?php

namespace Database\Factories;

use App\Models\Barcode;
use App\Models\Premix;
use App\Models\User;
use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BarcodeFactory extends Factory
{
    protected $model = Barcode::class;

    public function definition()
    {
        $premix = Premix::inRandomOrder()->first() ?? Premix::factory()->create();
        $department = Department::inRandomOrder()->first() ?? Department::factory()->create();
        $scannedUser = User::where('role', 'measuring_worker')->inRandomOrder()->first();
        $verifiedUser = User::where('role', 'receiving_worker')->inRandomOrder()->first();

        return [
            'barcode_value' => strtoupper(Str::random(10)),
            'premix_id' => $premix->id,
            'status' => $this->faker->randomElement(['generated', 'scanned', 'verified']),
            'qr_image_path' => null, // can be generated dynamically
            'scanned_at' => $this->faker->optional()->dateTimeThisMonth(),
            'scanned_by' => $scannedUser?->id,
            'verified_at' => $this->faker->optional()->dateTimeThisMonth(),
            'verified_by' => $verifiedUser?->id,
            'department_id' => $department->id,
        ];
    }
}

