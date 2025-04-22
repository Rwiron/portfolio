<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Portfolio\ContactController;
use App\Http\Controllers\API\Portfolio\EducationController;
use App\Http\Controllers\API\Portfolio\ExperienceController;
use App\Http\Controllers\API\Portfolio\ProjectController;
use App\Http\Controllers\API\Portfolio\SettingController;
use App\Http\Controllers\API\Portfolio\SkillController;
use App\Http\Controllers\API\Portfolio\TestimonialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::post('/login', [AuthController::class, 'login']);

// Public (for frontend form)
Route::post('/contact', [ContactController::class, 'store']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);






    // PROJECT ROUTES (grouped)
    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::get('/{project}', [ProjectController::class, 'show']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::put('/{project}', [ProjectController::class, 'update']);
        Route::delete('/{project}', [ProjectController::class, 'destroy']);
    });


    // SKILL ROUTES (grouped)
    Route::prefix('skills')->group(function () {
        Route::get('/', [SkillController::class, 'index']);
        Route::get('/{skill}', [SkillController::class, 'show']);
        Route::post('/', [SkillController::class, 'store']);
        Route::put('/{skill}', [SkillController::class, 'update']);
        Route::delete('/{skill}', [SkillController::class, 'destroy']);
    });


    // CONTACT ROUTES (grouped)
    Route::prefix('contacts')->group(function () {
        Route::get('/', [ContactController::class, 'index']);
        Route::patch('/{id}/read', [ContactController::class, 'markAsRead']);
        Route::delete('/{id}', [ContactController::class, 'destroy']);
    });

    // EXPERIENCE ROUTES (grouped)
    Route::prefix('experiences')->group(function () {
        Route::get('/', [ExperienceController::class, 'index']);
        Route::get('/{experience}', [ExperienceController::class, 'show']);
        Route::post('/', [ExperienceController::class, 'store']);
        Route::put('/{experience}', [ExperienceController::class, 'update']);
        Route::delete('/{experience}', [ExperienceController::class, 'destroy']);
    });


    // EDUCATION ROUTES (grouped)
    Route::prefix('educations')->group(function () {
        Route::get('/', [EducationController::class, 'index']);
        Route::get('/{education}', [EducationController::class, 'show']);
        Route::post('/', [EducationController::class, 'store']);
        Route::put('/{education}', [EducationController::class, 'update']);
        Route::delete('/{education}', [EducationController::class, 'destroy']);
    });

    // TESTIMONIAL ROUTES (grouped)
    Route::prefix('testimonials')->group(function () {
        Route::get('/', [TestimonialController::class, 'index']);
        Route::get('/{testimonial}', [TestimonialController::class, 'show']);
        Route::post('/', [TestimonialController::class, 'store']);
        Route::put('/{testimonial}', [TestimonialController::class, 'update']);
        Route::delete('/{testimonial}', [TestimonialController::class, 'destroy']);
    });

    // SETTINGS ROUTES (grouped)
    Route::prefix('settings')->group(function () {
        Route::get('/', [SettingController::class, 'index']);
        Route::post('/', [SettingController::class, 'updateOrCreate']);
        Route::get('/{key}', [SettingController::class, 'getByKey']);
    });


});








Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');