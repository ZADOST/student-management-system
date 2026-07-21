<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/student/dashboard', [DashboardController::class, 'student']);
    Route::get('/teacher/dashboard', [DashboardController::class, 'teacher']);
    Route::get('/principal/dashboard', [DashboardController::class, 'principal']);
});
