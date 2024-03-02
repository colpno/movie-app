<?php

namespace App\Services;

use Illuminate\Http\Request;

class ApiQuery
{
	protected $safeQueries = []; // [queryColumn => [eq, ne]]
	protected $columnMap = []; // [queryColumn => query_column]
	protected $safeOperators = [
		"eq" => "=",
		"ne" => "!=",
		"gt" => ">",
		"gte" => ">=",
		"lt" => "<",
		"lte" => "<=",
	];

	public function transform(Request $request)
	{
		$eloQueries = []; // [[column, operator, value]]

		foreach ($this->safeQueries as $queryColumn => $queryOperators) {
			$query = $request->query($queryColumn); // [queryColumn => [queryOperator => value]]

			if (!isset($query)) {
				continue;
			}

			$column = $this->columnMap[$queryColumn] ?? $queryColumn;

			foreach ($queryOperators as $queryOperator) {
				$operator = $this->safeOperators[$queryOperator];

				if (isset($operator)) {
					$value = $query[$queryOperator];
					$eloQueries[] = [$column, $operator, $value];
				}
			}
		}

		return $eloQueries;
	}
}
