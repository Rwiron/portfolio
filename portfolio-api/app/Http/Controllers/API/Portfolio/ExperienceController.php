<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Experience;
use App\Http\Resources\ExperienceResource;

class ExperienceController extends Controller
{
    // 📋 List all experiences
    public function index()
    {
        return ExperienceResource::collection(
            Experience::latest()->get()
        );
    }

    // ➕ Create new experience
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title'     => 'required|string|max:255',
            'company_name'  => 'required|string|max:255',
            'location'      => 'nullable|string|max:255',
            'start_date'    => 'required|date',
            'end_date'      => 'nullable|date|after_or_equal:start_date',
            'description'   => 'nullable|string',
        ]);

        $experience = Experience::create($validated);

        return new ExperienceResource($experience);
    }

    // 🔍 Show one
    public function show(Experience $experience)
    {
        return new ExperienceResource($experience);
    }

    // ✏️ Update experience
    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'job_title'     => 'required|string|max:255',
            'company_name'  => 'required|string|max:255',
            'location'      => 'nullable|string|max:255',
            'start_date'    => 'required|date',
            'end_date'      => 'nullable|date|after_or_equal:start_date',
            'description'   => 'nullable|string',
        ]);

        $experience->update($validated);

        return new ExperienceResource($experience);
    }

    // ❌ Delete experience
    public function destroy(Experience $experience)
    {
        $experience->delete();

        return response()->json(['message' => 'Experience deleted.']);
    }
}