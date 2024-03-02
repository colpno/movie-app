<?php

namespace App\Services;

use Illuminate\Database\Eloquent\RelationNotFoundException;
use Illuminate\Http\Request;

class Embedding
{
	/**
	 * @throws RelationNotFoundException if the relation not found
	 */
	public function transform(Request $request, mixed &$resource)
	{
		$embeds = json_decode($request->query('embed')); // [field]

		if (isset($embeds) && is_array($embeds) && count($embeds) > 0 && isset($resource)) {
			try {
				foreach ($embeds as $embed) {
					$resource = is_array($resource)
						? $resource->with($embed)
						: $resource->loadMissing($embed);
				}
			} catch (RelationNotFoundException $e) {
				throw $e;
			}
		}
	}
}
