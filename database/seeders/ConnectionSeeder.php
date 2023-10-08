<?php

namespace Database\Seeders;

use App\Models\Connection;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConnectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::select('id')->inRandomOrder()->get()->pluck('id');

        for ($i = 0; $i < 200; $i++) {
            $user_id = $users->random();
            $connected_user_id = $users->random();
            $type = fake()->randomElement(['peer', 'protege', 'mentor']);
            if ($user_id == $connected_user_id) {
                $user_id = 1;
            }
            if ($user_id == $connected_user_id) {
                continue;
            } elseif (
                Connection::where(fn ($query) =>
                $query->where(['user_id' => $user_id, 'connected_user_id' => $connected_user_id]))
                ->orWhere(fn ($query) =>
                $query->where(['user_id' => $connected_user_id, 'connected_user_id' => $user_id]))->count() > 0
            ) {
                continue;
            } else {
                Connection::create(
                    [
                        'user_id' => $user_id, 'connected_user_id' => $connected_user_id,
                        'connection_type' => fake()->randomElement(['peer', 'protege', 'mentor']),
                        'status' => 'accepted', //$user_id == 1 ? 'accepted' : fake()->randomElement(['pending', 'accepted', 'accepted', 'accepted']),
                        'created_at' => now(),
                        'updated_at' => now()
                    ]
                );
            }
        }
    }
}
