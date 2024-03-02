<?php

namespace App\Http\Resources\V1;

use App\Http\Controllers\Api\V1\VideoController;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoriteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $videoController = new VideoController();
        $video = $videoController->detail($this->media_type, $this->video_id)->getData()->data; // stdClass

        return [
            'id' => $this->id,
            'video_id' => [
                'id' => $this->video_id,
                ...json_decode(json_encode($video), true),
            ],
            'media_type' => $this->media_type,
            'user_id' => $this->whenLoaded('user'),
            'created_at' => $this->created_at,
        ];
    }
}
