<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimonial;
use App\Http\Resources\TestimonialResource;

class TestimonialController extends Controller
{
    // 🧾 List all testimonials
    public function index()
    {
        return TestimonialResource::collection(
            Testimonial::latest()->get()
        );
    }

    // ➕ Add new testimonial
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'role'       => 'nullable|string|max:100',
            'message'    => 'required|string|min:10',
            'photo_url'  => 'nullable|url',
        ]);

        $testimonial = Testimonial::create($validated);

        return new TestimonialResource($testimonial);
    }

    // 🔍 View one
    public function show(Testimonial $testimonial)
    {
        return new TestimonialResource($testimonial);
    }

    // ✏️ Update testimonial
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'role'       => 'nullable|string|max:100',
            'message'    => 'required|string|min:10',
            'photo_url'  => 'nullable|url',
        ]);

        $testimonial->update($validated);

        return new TestimonialResource($testimonial);
    }

    // ❌ Delete testimonial
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json(['message' => 'Testimonial deleted successfully']);
    }
}