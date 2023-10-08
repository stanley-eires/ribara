<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //GET AVAILABLE USERS
        $users = User::get();

        for ($i = 0; $i < 100; $i++) {
            $postmeta = [
                'type' => 'image', 'images' => []
            ];
            for ($j = 0; $j < mt_rand(0, 6); $j++) {
                $postmeta['images'][] = '/assets/images/posts/img-' . mt_rand(1, 31) . ".jpg";
            }
            $created_at = fake()->dateTimeBetween('- 3 days')->getTimestamp();
            Post::create([
                "user_id" => $users->random()->id,
                "content" => fake()->realTextBetween(50, 300),
                'postmeta' => $postmeta,
                'is_promoted' => 0,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
        }
    }
}
