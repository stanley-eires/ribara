<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Job::truncate();
        $dataset = json_decode(file_get_contents(public_path('jobs.json')));
        foreach ($dataset as $key) {
            Job::create([
                "title" => $key->title, "company" => $key->company, "url" => $key->url
            ]);
        }
    }
}
