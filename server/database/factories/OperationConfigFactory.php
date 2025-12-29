<?php

namespace Database\Factories;

use App\Models\OperationConfig;
use Illuminate\Database\Eloquent\Factories\Factory;

class OperationConfigFactory extends Factory
{
    protected $model = OperationConfig::class;

    public function definition()
    {
        $start = $this->faker->time('H:i:s', '08:00:00');
        $end = $this->faker->time('H:i:s', '17:00:00');

        return [
            'start_time' => $start,
            'end_time' => $end,
            'daily_quota' => $this->faker->numberBetween(300, 500), // realistic target
            'is_active' => true,
        ];
    }
}

