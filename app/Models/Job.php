<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'company', 'logo', 'description', 'jobmeta', 'url'
    ];
    protected $casts = ['jobmeta' => 'array'];
}
