<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEducation extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'user_id', 'degree', 'institution', 'study', 'start_end_date'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
