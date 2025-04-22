<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Portfolio\ProjectController;
use App\Http\Controllers\API\Portfolio\SkillController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;






Route::post('/login', [AuthController::class, 'login']);

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


});








Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');