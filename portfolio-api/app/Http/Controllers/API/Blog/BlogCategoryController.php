<?php

namespace App\Http\Controllers\API\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BlogCategory;
use App\Http\Resources\BlogCategoryResource;
use Illuminate\Support\Str;

class BlogCategoryController extends Controller
{
    // 📋 List all categories
    public function index()
    {
        return BlogCategoryResource::collection(BlogCategory::latest()->get());
    }

    // ➕ Create a category
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:blog_categories,name',
        ]);

        $category = BlogCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return new BlogCategoryResource($category);
    }

    // 🔍 View a single category
    public function show(BlogCategory $blogCategory)
    {
        return new BlogCategoryResource($blogCategory);
    }

    // ✏️ Update category
    public function update(Request $request, BlogCategory $blogCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:blog_categories,name,' . $blogCategory->id,
        ]);

        $blogCategory->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return new BlogCategoryResource($blogCategory);
    }

    // ❌ Delete category
    public function destroy(BlogCategory $blogCategory)
    {
        $blogCategory->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
