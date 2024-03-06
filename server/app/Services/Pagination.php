<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Pagination
{
	public function paginate(Builder &$builder, Request $request)
	{
		$page = $request->query("page", 1);
		$perPage = $request->query("perPage", 30);
		$builder->paginate($perPage, ['*'], 'page', $page)->appends($request->query());
	}
}
