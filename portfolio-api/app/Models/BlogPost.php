<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'image',
        'is_published',
    ];

    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class, 'post_category');
    }
}