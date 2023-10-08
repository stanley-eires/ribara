<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Connection;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // GET THE CURRENT USER CONNECTIONS

        $connections = Connection::select('user_id', 'connected_user_id')->where(['status' => 'accepted', 'connection_type' => 'protege'])->where(fn ($query) => $query->where(['connected_user_id' => 1])->orWhere(['user_id' => 1]))->get();
        foreach ($connections as $key) {
            Appointment::create([
                'appointment_timestamp' => fake()->dateTimeBetween('-12 hours', '+48 hours')->getTimestamp(),
                'duration' => 60,
                'host' => $key->user_id,
                'friend' => $key->connected_user_id,
                'content' => fake()->realTextBetween(50, 300),
                'status' => 'pending'
            ]);
        }
    }
}
