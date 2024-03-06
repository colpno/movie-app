<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\RelationNotFoundException;
use Illuminate\Http\Request;

class Embedding
{
	/**
	 * @throws RelationNotFoundException if the relation not found
	 */
	public function embed(Request $request, mixed &$resource)
	{
		$embeds = json_decode($request->query('embed')); // ["column"]

		if (isset($embeds) && is_array($embeds) && count($embeds) > 0 && isset($resource)) {
			try {
				foreach ($embeds as $embed) {
					$resource = $resource instanceof Builder
						? $resource->with($embed)
						: $resource->loadMissing($embed);
				}
			} catch (RelationNotFoundException $e) {
				throw $e;
			}
		}
	}
}
