<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCertification extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'user_id', 'title', 'organization', 'issued_date', 'url'
    ];
}
