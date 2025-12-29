<?php

namespace Database\Factories;

use App\Models\Premix;
use Illuminate\Database\Eloquent\Factories\Factory;

class PremixFactory extends Factory
{
    protected $model = Premix::class;

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
