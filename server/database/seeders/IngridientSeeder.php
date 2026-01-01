<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingridient;

class IngridientSeeder extends Seeder
{
    public function run(): void
    {
        $ingridients = [
            // --- DRY BASE INGREDIENTS ---
            [
                'name' => 'Cake Flour',
                'type' => 'base',
                'image_path' => 'cake-flour.webp',
                'description' => 'High-quality fine flour for structure',
                'unit' => 'kg',
                'stock_quantity' => 25.00,
                'reorder_level' => 5.00,
                'unit_cost' => 1.50
            ],
            [
                'name' => 'Sugar',
                'type' => 'base',
                'image_path' => 'sugar.webp',
                'description' => 'Fine granulated white sugar',
                'unit' => 'kg',
                'stock_quantity' => 15.00,
                'reorder_level' => 3.00,
                'unit_cost' => 1.20
            ],
            [
                'name' => 'Egg Powder',
                'type' => 'base',
                'image_path' => 'egg-powder.webp',
                'description' => 'Dehydrated egg solids for binding',
                'unit' => 'kg',
                'stock_quantity' => 5.00,
                'reorder_level' => 1.00,
                'unit_cost' => 12.00
            ],
            [
                'name' => 'Baking Powder',
                'type' => 'base',
                'image_path' => 'baking-powder.webp',
                'description' => 'Chemical leavening agent for lift',
                'unit' => 'g',
                'stock_quantity' => 1000.00,
                'reorder_level' => 200.00,
                'unit_cost' => 0.05
            ],

            // --- DRY ADDITIONAL INGREDIENTS (ENHANCERS) ---
            [
                'name' => 'Vanilla Powder',
                'type' => 'additional',
                'image_path' => 'vanilla-powder.webp',
                'description' => 'Concentrated dry vanilla flavoring',
                'unit' => 'g',
                'stock_quantity' => 500.00,
                'reorder_level' => 100.00,
                'unit_cost' => 0.45
            ],
            [
                'name' => 'Milk Powder',
                'type' => 'additional',
                'image_path' => 'milk-powder.webp',
                'description' => 'Full cream milk powder for richness',
                'unit' => 'kg',
                'stock_quantity' => 5.00,
                'reorder_level' => 1.00,
                'unit_cost' => 6.50
            ],
            [
                'name' => 'Salt',
                'type' => 'additional',
                'image_path' => 'salt.webp',
                'description' => 'Fine sea salt for flavor balance',
                'unit' => 'g',
                'stock_quantity' => 2000.00,
                'reorder_level' => 500.00,
                'unit_cost' => 0.01
            ],
            [
                'name' => 'Cocoa Powder',
                'type' => 'additional',
                'image_path' => 'cocoa-powder.webp',
                'description' => 'Dutch-processed unsweetened cocoa',
                'unit' => 'g',
                'stock_quantity' => 3000.00,
                'reorder_level' => 500.00,
                'unit_cost' => 0.25
            ],
        ];

        foreach ($ingridients as $ingridient) {
            Ingridient::updateOrCreate(['name' => $ingridient['name']], $ingridient);
        }
    }
}

