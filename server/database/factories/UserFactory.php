<?php

namespace Database\Factories;

use App\Models\Station;
use App\Models\User;
use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        static $sequence = 0;
        $roles = ['measuring_worker', 'receiving_worker', 'manager', 'admin'];
        $prefix = now()->format('ym');
        $sequence++;
        $employee_id = $prefix . str_pad($sequence, 3, '0', STR_PAD_LEFT);

        return [
            'employee_id' => $employee_id,
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'middle_name' => $this->faker->optional()->firstName,
            'suffix' => $this->faker->optional()->randomElement(['Jr.', 'Sr.', 'II', 'III', 'IV']),
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'),
            'plain_password' => 'password',
            'role' => $this->faker->randomElement($roles),
            'birthdate' => $this->faker->dateTimeBetween(
                now()->subYears(60),
                now()->subYears(18)
            )->format('Y-m-d'),

            // ✅ New Fields Added Below
            'sex' => $this->faker->randomElement(['male', 'female']),

            // Generates a Philippine-style mobile number (e.g., 09171234567)
            'contact_number' => $this->faker->numerify('09#########'),

            'address' => $this->faker->address,

            // ⚠️ REMINDER: If you are using UserSeeder to assign specific stations, 
            // keep this as null or use a query. If you leave Station::factory(), 
            // it will create a NEW station for every user.
            'station_id' => null,
        ];
    }
}
