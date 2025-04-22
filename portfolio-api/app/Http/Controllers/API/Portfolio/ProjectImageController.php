<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProjectImage;
use App\Http\Resources\ProjectImageResource;

class ProjectImageController extends Controller
{
    // 📋 List all images for a specific project
    public function index($projectId)
    {
        $images = ProjectImage::where('project_id', $projectId)->get();
        return ProjectImageResource::collection($images);
    }

    // ➕ Store new image
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'image_url'  => 'required|url',
            'caption'    => 'nullable|string|max:255',
        ]);

        $image = ProjectImage::create($request->only('project_id', 'image_url', 'caption'));

        return new ProjectImageResource($image);
    }

    // ❌ Delete image
    public function destroy(ProjectImage $projectImage)
    {
        $projectImage->delete();

        return response()->json(['message' => 'Project image deleted successfully']);
    }
}
