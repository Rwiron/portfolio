<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'live_url',
        'github_url',
        'cover_image',
        'featured',
        'status',
    ];

    /**
     * The skills that belong to the project.
     */
    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'project_skill');
    }
}