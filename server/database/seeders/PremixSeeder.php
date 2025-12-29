<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Premix;

class PremixSeeder extends Seeder
{
    public function run(): void
    {
        $premixes = [
            ['name' => 'Cake Flour', 'description' => 'High-quality flour for cakes', 'unit' => 'kg'],
            ['name' => 'Sugar', 'description' => 'Refined sugar for baking', 'unit' => 'kg'],
            ['name' => 'Egg Powder', 'description' => 'Powdered eggs for cake batter', 'unit' => 'kg'],
            ['name' => 'Butter', 'description' => 'Unsalted butter', 'unit' => 'kg'],
            ['name' => 'Vanilla Powder', 'description' => 'Vanilla flavoring', 'unit' => 'g'],
            ['name' => 'Milk Powder', 'description' => 'Powdered milk', 'unit' => 'kg'],
            ['name' => 'Baking Powder', 'description' => 'Leavening agent', 'unit' => 'g'],
            ['name' => 'Salt', 'description' => 'Fine salt for baking', 'unit' => 'g'],
            ['name' => 'Cocoa Powder', 'description' => 'Unsweetened cocoa', 'unit' => 'g'],
        ];

        foreach ($premixes as $premix) {
            Premix::firstOrCreate(['name' => $premix['name']], $premix);
        }
    }
}

