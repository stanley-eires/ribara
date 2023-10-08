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
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->uuid('likeable_id');
            $table->string('likeable_type')->default("App\\\Models\\\Post");
            $table->enum('reaction', ['like', 'dislike', 'celebrate', 'support', 'insightful'])->default('like');
            $table->timestamps();
            $table->unique(['user_id', 'likeable_id', 'reaction', 'likeable_type']);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
