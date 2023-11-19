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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedBigInteger('user_id');
            $table->text('content')->nullable();
            $table->json('postmeta');
            $table->enum('type', ['post', 'event'])->default('post');
            $table->enum('audience', ['public', 'connections', 'only-me'])->default('public');
            $table->enum('status', ['published', 'unpublished'])->default('published');
            $table->boolean('is_promoted')->default(0);
            $table->boolean('admin_post')->default(0);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
