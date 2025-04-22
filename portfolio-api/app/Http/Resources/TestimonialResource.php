<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'name'      => $this->name,
            'role'      => $this->role,
            'message'   => $this->message,
            'photo_url' => $this->photo_url,
            'created_at' => $this->created_at->toDateString(),
        ];
    }
}