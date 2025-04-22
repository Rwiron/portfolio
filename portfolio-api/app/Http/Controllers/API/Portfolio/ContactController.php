<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Resources\ContactResource;

class ContactController extends Controller
{
    // 📥 Store message (public form)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'message' => 'Message received successfully!',
            'data'    => new ContactResource($contact)
        ], 201);
    }

    // 📃 View all messages (admin)
    public function index()
    {
        return ContactResource::collection(Contact::latest()->get());
    }

    // ✅ Mark as read
    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->is_read = true;
        $contact->save();

        return response()->json(['message' => 'Marked as read.']);
    }

    // ❌ Delete message
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Message deleted.']);
    }
}