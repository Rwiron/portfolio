<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'company_name',
        'location',
        'start_date',
        'end_date',
        'description',
    ];
}