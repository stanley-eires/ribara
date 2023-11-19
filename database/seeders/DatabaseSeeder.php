<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ConnectionSeeder::class,
            JobSeeder::class,
            MessageSeeder::class,
            AppointmentSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
            RolesAndPermissionsSeeder::class,
        ]);
    }
}
