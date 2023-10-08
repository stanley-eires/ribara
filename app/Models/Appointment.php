<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use
        HasFactory,
        HasUuids;

    protected $fillable = [
        'appointment_timestamp', 'duration', 'host', 'friend', 'content', 'status'
    ];

    protected $with = ['host_user', 'friend_user'];

    public function host_user()
    {
        return $this->belongsTo(User::class, 'host')->select('id', 'firstname', 'lastname', 'slug', 'avatar', 'headline', 'phone');
    }
    public function friend_user()
    {
        return $this->belongsTo(User::class, 'friend')->select('id', 'firstname', 'lastname', 'slug', 'avatar', 'headline', 'phone');
    }
}
