<?php

use App\Http\Controllers\Api\V1\GenreController;
use App\Http\Controllers\Api\V1\VideoController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v1"], function () {
	Route::controller(VideoController::class)->prefix('{mediaType}')->group(function () {
		Route::get("/", 'index');
		Route::get("list/{type}", 'getByType')->whereAlpha('type');
		Route::get("trending", 'getTrending');
		Route::get("search", 'search');
		Route::get("{id}", 'detail')->whereNumber('id');
	})->whereIn('mediaType', ['movie', 'tv']);
	Route::get('genres/{mediaType}', [GenreController::class, 'index'])->whereIn('mediaType', ['movie', 'tv']);
});
