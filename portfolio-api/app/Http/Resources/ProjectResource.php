<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'live_url' => $this->live_url,
            'github_url' => $this->github_url,
            'cover_image' => $this->cover_image,
            'featured' => $this->featured,
            'status' => $this->status,
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
        ];
    }
}