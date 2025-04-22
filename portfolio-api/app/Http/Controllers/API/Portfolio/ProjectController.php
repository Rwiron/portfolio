<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    // public function index()
    // {
    //     return ProjectResource::collection(Project::latest()->get());
    // }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'slug' => 'required|string|unique:projects,slug',
    //         'description' => 'nullable|string',
    //         'live_url' => 'nullable|url',
    //         'github_url' => 'nullable|url',
    //         'cover_image' => 'nullable|url',
    //         'featured' => 'boolean',
    //         'status' => 'required|in:draft,published',
    //     ]);

    //     $project = Project::create($validated);

    //     return new ProjectResource($project);
    // }




    public function index()
    {
        return ProjectResource::collection(
            Project::with('skills')->latest()->get()
        );
    }

    
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'required|string|unique:projects,slug',
                'description' => 'nullable|string',
                'live_url' => 'nullable|url',
                'github_url' => 'nullable|url',
                'cover_image' => 'nullable|url',
                'featured' => 'boolean',
                'status' => 'required|in:draft,published',
                'skills' => 'nullable|array',
                'skills.*' => 'exists:skills,id'
            ]);

            // Remove skills from validated data as it's not a direct column
            $skills = $request->input('skills', []);
            $projectData = collect($validated)->except('skills')->toArray();

            $project = Project::create($projectData);

            // Attach skills if provided
            if (!empty($skills)) {
                $project->skills()->sync($skills);
            }

            DB::commit();

            return new ProjectResource($project->load('skills'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create project',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // public function show(Project $project)
    // {
    //     return new ProjectResource($project);
    // }


    public function show(Project $project)
    {
        return new ProjectResource($project->load('skills'));
    }

    public function update(Request $request, Project $project)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'required|string|unique:projects,slug,' . $project->id,
                'description' => 'nullable|string',
                'live_url' => 'nullable|url',
                'github_url' => 'nullable|url',
                'cover_image' => 'nullable|url',
                'featured' => 'boolean',
                'status' => 'required|in:draft,published',
                'skills' => 'nullable|array',
                'skills.*' => 'exists:skills,id'
            ]);

            // Remove skills from validated data
            $skills = $request->input('skills', []);
            $projectData = collect($validated)->except('skills')->toArray();

            $project->update($projectData);

            // Sync skills if provided
            if ($request->has('skills')) {
                $project->skills()->sync($skills);
            }

            DB::commit();

            return new ProjectResource($project->load('skills'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}