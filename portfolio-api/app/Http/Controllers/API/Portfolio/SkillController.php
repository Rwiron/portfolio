<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Http\Resources\SkillResource;

class SkillController extends Controller
{
    public function index()
    {
        return SkillResource::collection(Skill::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'category' => 'nullable|string|max:50',
            'level' => 'required|in:beginner,intermediate,expert',
        ]);

        $skill = Skill::create($validated);

        return new SkillResource($skill);
    }

    public function show(Skill $skill)
    {
        return new SkillResource($skill);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'category' => 'nullable|string|max:50',
            'level' => 'required|in:beginner,intermediate,expert',
        ]);

        $skill->update($validated);

        return new SkillResource($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->json(['message' => 'Skill deleted successfully']);
    }
}