<?php

namespace Database\Seeders;

use App\Models\Connection;
use App\Models\Message;
use App\Models\MessageConversation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $current_user_connects = Connection::select('user_id', 'connected_user_id')->where('status', 'accepted')->where(fn ($builder) => $builder->where('user_id', 1)->orWhere('connected_user_id', 1))->inRandomOrder()->get();

        $current_user_connects = $current_user_connects->map(fn ($e) => $e->user_id)->merge($current_user_connects->map(fn ($e) => $e->connected_user_id))->unique()->values();
        $u1 = 1;

        for ($i = 0; $i < mt_rand(10, count($current_user_connects)); $i++) {
            $u2 = $current_user_connects[$i];
            if ($u2 !== 1) {
                $message = Message::create([
                    "user_id" => $u1,
                    "friend_id" => $u2,
                ]);
                for ($j = 0; $j <= mt_rand(5, 20); $j++) {
                    MessageConversation::create([
                        'receiver' => fake()->randomElement([$u1, $u2]),
                        'content' => fake()->realTextBetween(50, 200),
                        'message_id' => $message->id,
                        'created_at' => fake()->dateTimeBetween('- 4 days')->getTimestamp()
                    ]);
                }
            }
        }
    }
}
