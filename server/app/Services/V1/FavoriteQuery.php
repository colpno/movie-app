<?php

namespace App\Services\V1;

use App\Services\ApiQuery;

class FavoriteQuery extends ApiQuery
{
	protected $safeQueries = [
		'videoId' => ['eq'],
		'userId' => ['eq'],
	];

	protected $columnMap = [
		'videoId' => 'video_id',
		'userId' => 'user_id',
	];
}
