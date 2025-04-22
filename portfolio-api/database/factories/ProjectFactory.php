<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(3);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraph,
            'live_url' => fake()->url(),
            'github_url' => fake()->url(),
            'cover_image' => fake()->imageUrl(),
            'featured' => fake()->boolean,
            'status' => fake()->randomElement(['draft', 'published']),
        ];
    }
}