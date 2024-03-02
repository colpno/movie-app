<?php

namespace App\Services\V1;

use App\Services\ApiQuery;

class UserQuery extends ApiQuery
{
	protected $safeParams = [
		'email' => ['eq', 'ne']
	];
}
