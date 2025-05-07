<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Api\TaskApiController;

Route::post('/tasks', [TaskApiController::class, 'store'])->middleware(['auth', 'verified']);