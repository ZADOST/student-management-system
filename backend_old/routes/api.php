<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/student/dashboard', [DashboardController::class, 'student']);
    Route::get('/teacher/dashboard', [DashboardController::class, 'teacher']);
    Route::get('/principal/dashboard', [DashboardController::class, 'principal']);
});
