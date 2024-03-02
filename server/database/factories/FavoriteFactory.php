<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Favorite>
 */
class FavoriteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck('id')->toArray();
        $mediaType = $this->faker->randomElement(['movie', 'tv']);

        return [
            'video_id' => $mediaType === 'movie' ? $this->faker->numberBetween(600000, 800000) : $this->faker->numberBetween(20000, 200000),
            'media_type' => $mediaType,
            'user_id' => $this->faker->randomElement($users),
        ];
    }
}
