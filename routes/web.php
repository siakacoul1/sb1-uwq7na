<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ActivityController;

Route::get('/', function () {
    return redirect()->route('activities.index');
});

Route::resource('departments', DepartmentController::class);
Route::resource('programs', ProgramController::class);
Route::resource('activities', ActivityController::class);