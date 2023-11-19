<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserCertification;
use App\Models\UserEducation;
use App\Models\UserExperience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for ($i = 1; $i <= 23; $i++) {
            $firstname = $faker->firstName();
            $lastname = $faker->firstName();
            // CREATE THE USERS
            $user = User::create([
                'firstname' => $firstname,
                'lastname' => $lastname,
                'slug' => str()->slug("{$firstname} {$lastname}", "-"),
                'phone' => $faker->phoneNumber(),
                'email' => $i == 1 ? env('MAIL_FROM_ADDRESS') : $faker->email(),
                'is_admin' => $i == 1 ? 1 : 0,
                'headline' => $faker->bs(),
                "avatar" => '/assets/images/avatars/' . $i . ".jpg",
                'usermeta' => [
                    'country' => $faker->country(),
                    'gender' => $faker->randomElement(['Male', 'Female']),
                    'dream_job' => ucfirst(
                        $faker->randomElement(
                            json_decode(file_get_contents(resource_path('js/Scripts/professions.json')))
                        )
                    ),
                    'bio' => $faker->realTextBetween(200, 400),
                    'available_for_work' => $faker->boolean(80),
                ],
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
                'password' => Hash::make("password"),
                'login_at' => $faker->boolean(80) ? fake()->dateTimeBetween('- 3 days')->getTimestamp() : null

            ]);
            // ATTACH EDUCATION
            for ($j = 0; $j < mt_rand(1, 3); $j++) {
                UserEducation::create([
                    "user_id" => $user->id,
                    'degree' => $faker->randomElement(['School Certificate', 'National Diploma', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree']),
                    'institution' => $faker->company,
                    'study' => $faker->catchPhrase(),
                    'start_end_date' => date("Y-m", $faker->dateTimeBetween('-12 years', '-6 years')->getTimestamp()) . " - " . date("Y-m", $faker->dateTimeBetween('-5 years')->getTimestamp()),
                ]);
            }
            // ATTACH EXPERIENCE
            for ($j = 0; $j < mt_rand(1, 4); $j++) {
                UserExperience::create([
                    "user_id" => $user->id,
                    'type' => $faker->randomElement(['Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Contract', 'Internship']),
                    'employer' => $faker->company,
                    'title' => $faker->catchPhrase(),
                    'start_end_date' => date("Y-m", $faker->dateTimeBetween('-12 years', '-6 years')->getTimestamp()) . " - " . date("Y-m", $faker->dateTimeBetween('-5 years')->getTimestamp()),
                    'description' => $faker->realTextBetween(100, 300),
                    'industry' => $faker->randomElement(
                        json_decode(file_get_contents(resource_path('js/Scripts/industries.json')))
                    )
                ]);
            }
            for ($j = 0; $j < mt_rand(1, 4); $j++) {
                UserCertification::create([
                    "user_id" => $user->id,
                    'organization' => $faker->company,
                    'title' => $faker->catchPhrase(),
                    'issued_date' => date("Y-m", $faker->dateTimeBetween()->getTimestamp()),
                    'url' => $faker->url(),
                ]);
            }
        }
        $users = User::select("id")->inRandomOrder()->get()->pluck("id");
        foreach ($users as $key) {
            $invited = $users->random();
            if ($invited != $key && fake()->boolean(60)) {
                User::where('id', $key)->update(['invited_by' => $invited]);
            }
        }
    }
}
