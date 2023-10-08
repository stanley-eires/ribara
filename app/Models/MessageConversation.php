<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\EloquentEagerLimit\HasEagerLimit;

class MessageConversation extends Model
{
    use HasFactory, HasEagerLimit;
    protected $fillable = [
        'receiver', 'read_at', 'message_id', 'content'
    ];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver')->select('id', 'firstname', 'lastname', 'slug', 'avatar');
    }
}
