<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/my-tasks/{userId}', [TaskController::class, 'myTasks']);
Route::patch('/tasks/{task}/status', [TaskController::class, 'updateStatus']);
Route::post('/users', [UserController::class, 'store']);

