<?php

use App\Http\Controllers\Api\V1\FavoriteController;
use App\Http\Controllers\Api\V1\GenreController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\VideoController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v1"], function () {
	Route::apiResource('favorites', FavoriteController::class);
	Route::get('genres/{mediaType}', [GenreController::class, 'index'])->whereIn('mediaType', ['movie', 'tv']);
	Route::controller(UserController::class)->prefix('users/{id}')->group(function () {
		Route::get("/", 'show');
		Route::put("/", 'update');
		Route::patch("/", 'update');
		Route::delete("/", 'destroy');
	})->whereNumber('id');
	Route::controller(VideoController::class)->prefix('{mediaType}')->group(function () {
		Route::get("/", 'index');
		Route::get("list/{type}", 'getByType')->whereIn('type', ['airing_today', 'popular', 'on_the_air', 'top_rated', 'now_playing', 'popular', 'top_rated', 'upcoming']);
		Route::get("trending/{time}", 'getTrending')->whereIn('time', ['day', 'week']);
		Route::get("search", 'search');
		Route::get("{id}", 'detail')->whereNumber('id');
	})->whereIn('mediaType', ['movie', 'tv']);
});
