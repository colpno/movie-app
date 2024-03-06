<?php

namespace App\Services\V1;

use App\Services\Sorting;

class FavoriteSorting extends Sorting
{
	protected $columnMap = [
		"mediaType" => "media_type",
	];
}
