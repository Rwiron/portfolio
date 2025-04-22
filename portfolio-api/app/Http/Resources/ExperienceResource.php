<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
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
            'job_title'    => $this->job_title,
            'company_name' => $this->company_name,
            'location'     => $this->location,
            'start_date'   => $this->start_date,
            'end_date'     => $this->end_date,
            'description'  => $this->description,
            'created_at'   => $this->created_at->toDateString(),
        ];
    }
}