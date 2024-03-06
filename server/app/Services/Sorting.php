<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class Sorting
{
	protected $safeOperators = ["asc", "desc"];
	protected $columnMap = [];

	/**
	 * @throws QueryException if column doesn't exist
	 */
	public function sort(Builder &$builder, Request $request)
	{
		$sortBy = $request->query("sortBy", null); // col1.asc|col2.desc

		if (isset($sortBy)) {
			$multiSorting = explode('|', $sortBy);

			foreach ($multiSorting as $sorting) {
				$operator = explode('.', $sorting);
				$col = $this->columnMap[$operator[0]] ?? $operator[0];
				$order = $operator[1];

				if (!isset($order) || !in_array($order, $this->safeOperators)) {
					throw new Exception('Invalid order operator');
				}

				try {
					if ($order === 'asc') {
						$builder->orderBy($col);
					} else {
						$builder->orderByDesc($col);
					}
				} catch (QueryException $e) {
					throw $e;
				}
			}
		}
	}
}
