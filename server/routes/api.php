<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\FavoriteController;
use App\Http\Controllers\Api\V1\GenreController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\VideoController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => "v1"], function () {
	// Public routes
	Route::get('genres/{mediaType}', [GenreController::class, 'index'])->whereIn('mediaType', ['movie', 'tv']);
	Route::prefix("auth")->controller(AuthController::class)->group(function () {
		Route::post('register', 'register');
		Route::post('login', 'login');
	});
	Route::prefix('{mediaType}')->controller(VideoController::class)->group(function () {
		Route::get("/", 'index')->whereIn('mediaType', ['movie', 'tv']);
		Route::get("search", 'search')->whereIn('mediaType', ['movie', 'tv']);
		Route::get("{id}", 'detail')->whereIn('mediaType', ['movie', 'tv'])->whereNumber('id');
		Route::get("{id}/trailer", 'trailer')->whereIn('mediaType', ['movie', 'tv'])->whereNumber('id');
	});

	// Protected routes
	Route::middleware('auth:sanctum')->group(function () {
		Route::prefix('favorites')->controller(FavoriteController::class)->group(function () {
			Route::get("/", 'index');
			Route::post("/", 'store');
			Route::delete("/", 'destroy');
			Route::get("{mediaType}/{id}", 'show')->whereIn('mediaType', ['movie', 'tv'])->whereNumber('id');
		});
		Route::prefix("auth")->controller(AuthController::class)->group(function () {
			Route::post('logout', 'logout');
		});
		Route::prefix('users/{id}')->controller(UserController::class)->group(function () {
			Route::get("/", 'show')->whereNumber('id');
			Route::put("/", 'update')->whereNumber('id');
			Route::patch("/", 'update')->whereNumber('id');
			Route::delete("/", 'destroy')->whereNumber('id');
		});
	});
});
