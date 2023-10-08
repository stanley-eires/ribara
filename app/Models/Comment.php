<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\EloquentEagerLimit\HasEagerLimit;

class Comment extends Model
{
    use HasFactory, HasUuids, HasEagerLimit;


    protected $fillable = [
        'user_id', 'content', 'commentable_id', 'commentable_type', 'parent_id', 'commentmeta'
    ];

    protected $casts = ['commentmeta' => 'array'];

    protected $with = ['user', 'likes'];

    public function user()
    {
        return $this->belongsTo(User::class)->select('id', 'firstname', 'lastname', 'slug', 'avatar');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable')->select('id', 'user_id', 'likeable_id', 'reaction');;
    }

    public function commentable()
    {
        return $this->morphTo();
    }

    // Self-referential relationship for handling nested (reply) comments
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // Relationship to get the parent comment (if it's a reply)
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
}
