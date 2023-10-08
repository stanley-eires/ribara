<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('avatar')->nullable();
            $table->string('headline')->nullable();
            $table->string('slug');
            $table->string('phone')->nullable()->unique();
            $table->string('email')->unique();
            $table->json('usermeta')->nullable();
            $table->json('interests')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('phone_verified_at')->nullable();
            $table->string('password');
            $table->boolean('is_admin')->default(0);
            $table->integer('invited_by')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->json('user_agents')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
