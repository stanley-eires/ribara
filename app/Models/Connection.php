<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'connected_user_id', 'status', 'connection_type'
    ];

    public static function getFriends($id)
    {
        $friends =
            Connection::select('id', 'user_id', 'connected_user_id', 'status', 'connection_type')->with('user:firstname,lastname,slug,avatar,headline,id')->with('friend:firstname,lastname,slug,avatar,headline,id')->where('user_id', $id)->orWhere('connected_user_id', $id)->get();
        return collect($friends->map(fn ($e) => $e->user))->merge($friends->map(fn ($e) => $e->friend))->where('id', '!=', $id)->unique('id')->sortBy('fullname')->values();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function friend()
    {
        return $this->belongsTo(User::class);
    }
}
