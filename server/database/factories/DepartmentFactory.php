<?php
namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition()
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Measuring Room',
                'Receiving Department',
                'Quality Control',
                'Administration'
            ]),
            'description' => $this->faker->sentence,
        ];
    }
}

