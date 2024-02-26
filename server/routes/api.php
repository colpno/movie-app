<?php

use App\Http\Controllers\Api\V1\GenreController;
use App\Http\Controllers\Api\V1\MovieController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v1"], function () {
	Route::controller(MovieController::class)->prefix('movies')->group(function () {
		Route::get("/", 'index');
		Route::get("upcoming", 'getUpcoming');
		Route::get("trending", 'getTrending');
		Route::get("{id}", 'detail');
	});
	Route::get('genres', [GenreController::class, 'index']);
});
