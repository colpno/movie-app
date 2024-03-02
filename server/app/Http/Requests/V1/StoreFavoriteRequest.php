<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreFavoriteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'videoId' => "required|integer|min:1",
            'mediaType' => "required|string|in:movie,tv",
            'userId' => "required|integer|exists:users,id",
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            "video_id" => $this->videoId,
            "media_type" => $this->mediaType,
            "user_id" => $this->userId,
        ]);
    }
}
