<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => "v1", 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
	// Protected routes
	Route::middleware('auth:sanctum')->group(function () {
		Route::prefix("auth")->controller(AuthController::class)->group(function () {
			Route::post('logout', 'logout');
		});
		Route::prefix('users/{id}')->controller(UserController::class)->group(function () {
			Route::get("/", 'show');
			Route::put("/", 'update');
			Route::patch("/", 'update');
			Route::delete("/", 'destroy');
		})->whereNumber('id');
		Route::apiResource('favorites', FavoriteController::class);
	});

	// Public routes
	Route::prefix("auth")->controller(AuthController::class)->group(function () {
		Route::post('register', 'register');
		Route::post('login', 'login');
	});
	Route::get('genres/{mediaType}', [GenreController::class, 'index'])->whereIn('mediaType', ['movie', 'tv']);
	Route::prefix('{mediaType}')->controller(VideoController::class)->group(function () {
		Route::get("/", 'index');
		Route::get("list/{type}", 'getByType')->whereIn('type', ['airing_today', 'popular', 'on_the_air', 'top_rated', 'now_playing', 'popular', 'top_rated', 'upcoming']);
		Route::get("trending/{time}", 'getTrending')->whereIn('time', ['day', 'week']);
		Route::get("search", 'search');
		Route::get("{id}", 'detail')->whereNumber('id');
	})->whereIn('mediaType', ['movie', 'tv']);
});
