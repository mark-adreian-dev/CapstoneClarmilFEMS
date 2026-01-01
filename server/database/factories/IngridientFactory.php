<?php

namespace Database\Factories;

use App\Models\Ingridient;
use Illuminate\Database\Eloquent\Factories\Factory;

class IngridientFactory extends Factory
{
    protected $model = Ingridient::class;

    public function definition()
    {
        $ingredients = [
            'Cake Flour',
            'Sugar',
            'Egg Powder',
            'Butter',
            'Vanilla Powder',
            'Milk Powder',
            'Baking Powder',
            'Salt',
            'Cocoa Powder'
        ];

        return [
            'name' => $this->faker->unique()->randomElement($ingredients),
            'description' => $this->faker->sentence,
            'unit' => $this->faker->randomElement(['kg', 'g', 'pcs']),
        ];
    }
}
