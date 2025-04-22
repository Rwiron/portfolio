<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    
    public function toArray($request)
    {
        return [
            'id'           => $this->id,
            'school_name'  => $this->school_name,
            'degree'       => $this->degree,
            'start_year'   => $this->start_year,
            'end_year'     => $this->end_year,
            'description'  => $this->description,
            'created_at'   => $this->created_at->toDateString(),
        ];
    }
}