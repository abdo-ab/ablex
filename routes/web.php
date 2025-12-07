<?php

use App\Http\Controllers\InteractionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ModuleController;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// user dashboard

Route::middleware(['auth', 'verified'])->group(function () {


    Route::get('dashboard', [ModuleController::class, 'index'])
        ->name('dashboard');
    Route::get('modules/{slug}', [ModuleController::class, 'show'])
        ->name('modules.show');
Route::post('/modules/{module}/comments', [ModuleController::class, 'storeComment'])->name('modules.comment');
    Route::post('/modules/{module}/like-toggle', [ModuleController::class, 'toggleLike'])
        ->name('modules.like.toggle');
});
// 404
Route::fallback(function () {
    return inertia('Errors/NotFound');
});
// forbidden
Route::get('/errors/403', fn () => inertia('pages/Errors/Forbidden'));


require __DIR__.'/settings.php';
