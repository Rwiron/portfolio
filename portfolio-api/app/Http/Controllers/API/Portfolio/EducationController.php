<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Education;
use App\Http\Resources\EducationResource;

class EducationController extends Controller
{
    // 📚 List all education records
    public function index()
    {
        return EducationResource::collection(
            Education::latest()->get()
        );
    }

    // ➕ Add education
    public function store(Request $request)
    {
        $validated = $request->validate([
            'school_name' => 'required|string|max:255',
            'degree'      => 'required|string|max:255',
            'start_year'  => 'required|integer|digits:4',
            'end_year'    => 'nullable|integer|digits:4|gte:start_year',
            'description' => 'nullable|string',
        ]);

        $education = Education::create($validated);

        return new EducationResource($education);
    }

    // 🔍 View one education record
    public function show(Education $education)
    {
        return new EducationResource($education);
    }

    // ✏️ Update education
    public function update(Request $request, Education $education)
    {
        $validated = $request->validate([
            'school_name' => 'required|string|max:255',
            'degree'      => 'required|string|max:255',
            'start_year'  => 'required|integer|digits:4',
            'end_year'    => 'nullable|integer|digits:4|gte:start_year',
            'description' => 'nullable|string',
        ]);

        $education->update($validated);

        return new EducationResource($education);
    }

    // ❌ Delete education
    public function destroy(Education $education)
    {
        $education->delete();

        return response()->json(['message' => 'Education deleted successfully']);
    }
}