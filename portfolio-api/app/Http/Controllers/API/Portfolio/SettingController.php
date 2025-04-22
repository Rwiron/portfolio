<?php

namespace App\Http\Controllers\API\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Http\Resources\SettingResource;

class SettingController extends Controller
{
    // 🔍 List all settings
    public function index()
    {
        return SettingResource::collection(Setting::all());
    }

    // ✅ Update or create a setting
    public function updateOrCreate(Request $request)
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'value' => 'nullable|string',
        ]);

        $setting = Setting::updateOrCreate(
            ['key' => $request->key],
            ['value' => $request->value]
        );

        return new SettingResource($setting);
    }

    // 🔍 Get one setting by key
    public function getByKey($key)
    {
        $setting = Setting::where('key', $key)->first();

        if (!$setting) {
            return response()->json(['message' => 'Setting not found.'], 404);
        }

        return new SettingResource($setting);
    }
}
