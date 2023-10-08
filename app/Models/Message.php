<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Staudenmeir\EloquentEagerLimit\HasEagerLimit;

class Message extends Model
{
    use
        HasFactory,
        HasUuids,
        HasEagerLimit;
    protected $fillable = [
        'user_id', 'friend_id', 'user_deleted', 'friend_deleted'
    ];
    protected $with = ['sender', 'receiver'];

    public function conversations()
    {
        return $this->hasMany(MessageConversation::class)->latest();
    }
    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'firstname', 'lastname', 'slug', 'avatar');
    }
    public function receiver()
    {
        return $this->belongsTo(User::class, 'friend_id')->select('id', 'firstname', 'lastname', 'slug', 'avatar');
    }
    public function lastConversation()
    {
        return $this->hasOne(MessageConversation::class, 'message_id')->select('read_at', 'message_id', 'created_at', 'receiver', 'content')->latest()->take(1);
    }
    public function unread_count()
    {
        return $this->hasOne(MessageConversation::class, 'message_id')->select('id');
    }
}
