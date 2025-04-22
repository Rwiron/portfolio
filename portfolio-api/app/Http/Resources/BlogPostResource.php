<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'content'      => $this->content,
            'image'        => $this->image,
            'is_published' => $this->is_published,
            'categories'   => BlogCategoryResource::collection($this->whenLoaded('categories')),
            'created_at'   => $this->created_at->toDateString(),
        ];
    }
}
