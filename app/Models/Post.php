<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;
    use HasFactory, HasUuids;
    protected $fillable = [
        'user_id', 'content', 'postmeta', 'is_promoted', 'type', 'audience', 'status', 'admin_post'
    ];

    protected $with = ['user', 'likes'];

    protected $casts = [
        'postmeta' => 'array', 'is_promoted' => 'boolean'
    ];
    // protected $attributes = [
    //     "attachments" => '[]'
    // ];

    public function user()
    {
        return $this->belongsTo(User::class)->select('id', 'firstname', 'lastname', 'slug', 'avatar', 'headline');
    }
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable')->select('id', 'user_id', 'likeable_id', 'reaction');
    }
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')->latest();
    }
}
