<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
	public function success(int $code = 200, string $message = null, mixed $data = null, array $headers = []): JsonResponse
	{
		$jsonData = [];

		isset($message) && $jsonData['message'] = $message;
		isset($data) && $jsonData['data'] = $data;

		return response()->json([
			"success" => true,
			...$jsonData,
		], $code, $headers);
	}

	public function error(int $code = 500, string $message = null, mixed $data = null, array $headers = []): JsonResponse
	{
		$jsonData = [];

		isset($message) && $jsonData['message'] = $message;
		isset($data) && $jsonData['data'] = $data;

		return response()->json($jsonData, $code, $headers);
	}
}
