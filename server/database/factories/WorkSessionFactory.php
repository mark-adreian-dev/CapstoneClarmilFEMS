<?php

namespace Database\Factories;

use App\Models\WorkSession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkSessionFactory extends Factory
{
    protected $model = WorkSession::class;

    public function definition()
    {
        $user = User::whereIn('role', ['measuring_worker', 'receiving_worker'])->inRandomOrder()->first();

        $start = $this->faker->dateTimeThisMonth();
        $duration = $this->faker->numberBetween(180, 480); // in minutes (3-8 hours)
        $idle = $this->faker->numberBetween(15, 120); // idle time in minutes

        return [
            'user_id' => $user?->id,
            'start_time' => $start,
            'end_time' => (clone $start)->modify("+{$duration} minutes"),
            'actual_work_duration_minutes' => $duration - $idle,
            'idle_minutes' => $idle,
            'total_output' => $this->faker->numberBetween(50, 500),
        ];
    }
}

