<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this -> id,
            'title' => $this -> title,
            'description' => $this -> description,
            'status' => $this -> status,
            'image_url' => $this->image_url ? url('storage/' . $this->image_url) : null,
            'priority' => $this->priority,
            'deadline' => $this->deadline,
            'assigned_users' => UserResource::collection($this->whenLoaded('users')),
        ];
    }
}
