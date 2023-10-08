<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts_id = Post::select('id')->inRandomOrder()->get()->pluck("id");
        $users_id = User::select('id')->inRandomOrder()->get()->pluck("id");

        for ($i = 0; $i < 500; $i++) {
            Like::updateOrCreate([
                'user_id' => $users_id->random(),
                'likeable_id' => $posts_id->random(),
                'reaction' => fake()->randomElement(['like', 'dislike', 'celebrate', 'support', 'insightful'])
            ]);
            $created_at = fake()->dateTimeBetween('- 3 days')->getTimestamp();
            $has_content = fake()->boolean(90);
            Comment::create([
                'user_id' => $users_id->random(),
                'commentable_id' => $posts_id->random(),
                'content' => $has_content ? fake()->realTextBetween(50, 200) : null,
                'commentmeta' => $has_content ? null :  ['type' => 'image', 'url' => '/assets/images/posts/img-' . mt_rand(1, 31) . ".jpg"],
                'created_at' => $created_at,
                'updated_at' => fake()->boolean(80) ? $created_at : fake()->dateTimeBetween('- 2 days')->getTimestamp()
            ]);
        }
        $comments = Comment::select('id', 'commentable_id')->inRandomOrder()->get();
        foreach ($comments as $key) {
            if (fake()->boolean(50)) {
                Comment::create([
                    'user_id' => $users_id->random(),
                    'parent_id' => $key->id,
                    'commentable_type' => "App\\Models\\Comment",
                    'commentable_id' => $key->commentable_id,
                    'content' => fake()->realTextBetween(50, 200),
                    'created_at' => $created_at,
                    'updated_at' => fake()->boolean(80) ? $created_at : fake()->dateTimeBetween('- 2 days')->getTimestamp()
                ]);
            }
            for ($k = 0; $k < mt_rand(0, 30); $k++) {
                try {
                    Like::updateOrCreate([
                        'user_id' => $users_id->random(),
                        'likeable_id' => $key->id,
                        'likeable_type' => "App\\Models\\Comment",
                        'reaction' => fake()->randomElement(['like', 'dislike', 'celebrate', 'support', 'insightful'])
                    ]);
                } catch (\Throwable $th) {
                }
            }
        }
    }
}
