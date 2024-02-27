<?php

if (!function_exists('mergeQueryString')) {
	function mergeQueryString(string|null $requestQueryString, array $initialQueries = [])
	{
		if (!is_null($requestQueryString)) {
			parse_str($requestQueryString, $queryArray);
			$queryArray = array_merge($initialQueries, $queryArray);
			$queryString = http_build_query($queryArray);
			return $queryString;
		}
		$queryString = http_build_query($initialQueries);
		return $queryString;
	}
}
