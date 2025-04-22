<?php

namespace App\Http\Controllers\API\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BlogPost;
use App\Http\Resources\BlogPostResource;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class BlogPostController extends Controller
{
    public function index()
    {
        try {
            return BlogPostResource::collection(
                BlogPost::with('categories')->latest()->get()
            );
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve blog posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'title'        => 'required|string|max:255|unique:blog_posts,title',
                'content'      => 'required|string|min:10',
                'image'        => 'nullable|url',
                'is_published' => 'boolean',
                'category_ids' => 'nullable|array',
                'category_ids.*' => 'exists:blog_categories,id',
            ]);

            $post = BlogPost::create([
                'title'        => $validated['title'],
                'slug'         => Str::slug($validated['title']),
                'content'      => $validated['content'],
                'image'        => $validated['image'] ?? null,
                'is_published' => $validated['is_published'] ?? false,
            ]);

            // Attach categories if provided
            if (!empty($validated['category_ids'])) {
                $post->categories()->sync($validated['category_ids']);
            }

            DB::commit();

            return new BlogPostResource($post->load('categories'));
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create blog post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(BlogPost $blogPost)
    {
        try {
            return new BlogPostResource($blogPost->load('categories'));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve blog post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'title'        => 'required|string|max:255|unique:blog_posts,title,' . $blogPost->id,
                'content'      => 'required|string|min:10',
                'image'        => 'nullable|url',
                'is_published' => 'boolean',
                'category_ids' => 'nullable|array',
                'category_ids.*' => 'exists:blog_categories,id',
            ]);

            $blogPost->update([
                'title'        => $validated['title'],
                'slug'         => Str::slug($validated['title']),
                'content'      => $validated['content'],
                'image'        => $validated['image'] ?? null,
                'is_published' => $validated['is_published'] ?? false,
            ]);

            // Sync categories if provided
            if (isset($validated['category_ids'])) {
                $blogPost->categories()->sync($validated['category_ids']);
            }

            DB::commit();

            return new BlogPostResource($blogPost->load('categories'));
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update blog post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(BlogPost $blogPost)
    {
        try {
            DB::beginTransaction();

            $blogPost->delete();

            DB::commit();

            return response()->json(['message' => 'Blog post deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to delete blog post',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
