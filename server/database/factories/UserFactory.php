<?php
namespace Database\Factories;

use App\Models\User;
use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        $roles = ['measuring_worker', 'receiving_worker', 'manager', 'admin'];

        return [
            'employee_id' => $this->faker->unique()->numerify('EMP###'),
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'),
            'role' => $this->faker->randomElement($roles),
            'department_id' => Department::factory(), // assign a department
        ];
    }
}
