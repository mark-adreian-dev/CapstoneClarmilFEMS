<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WorkSession;
use App\Models\User;

class WorkSessionSeeder extends Seeder
{
    public function run(): void
    {
        $workers = User::whereIn('role', ['measuring_worker', 'receiving_worker'])->get();

        foreach ($workers as $worker) {
            WorkSession::factory()->count(3)->create([
                'user_id' => $worker->id
            ]);
        }
    }
}
