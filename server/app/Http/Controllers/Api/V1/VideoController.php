<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Psr\Http\Message\ResponseInterface;

class VideoController extends Controller
{
    private $http;
    private $tmdbBaseURL;
    private $tmdbAccessToken;

    public function __construct()
    {
        parent::__construct();
        $this->http = new Client();
        $this->tmdbBaseURL = config('constants.TMDB_BASE_URL');
        $this->tmdbAccessToken = config('constants.TMDB_ACCESS_TOKEN');
    }

    /**
     * Convert GuzzleHttp response
     */
    private function returning(ResponseInterface $res): JsonResponse
    {
        $data = json_decode($res->getBody()->getContents(), true);

        return $res->getStatusCode() < 300
            ? $this->apiResponse->success($res->getStatusCode(), null, $data)
            : $this->apiResponse->error($res->getStatusCode(), $data);
    }

    /**
     * Fetching a listing of the resource.
     */
    public function index(Request $request, string $mediaType)
    {
        $queryString = $request->getQueryString();
        $url = $this->tmdbBaseURL . '/discover/' . $mediaType . '?' . $queryString;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);

        return $this->returning($res);
    }

    /**
     * Fetching the specified resource.
     */
    public function detail(string $mediaType, string $id)
    {
        $url = $this->tmdbBaseURL . '/' . $mediaType . '/' . $id;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);

        return $this->returning($res);
    }

    /**
     * Search the resources.
     */
    public function search(Request $request, string $mediaType)
    {
        $queryString = $request->getQueryString();
        $url = $this->tmdbBaseURL . '/search/' . $mediaType . '?' . $queryString;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);

        return $this->returning($res);
    }

    /**
     * Get trailer based on mediaType and id
     */
    public function trailer(Request $request, string $mediaType, string $id)
    {
        $url = $this->tmdbBaseURL . '/' . $mediaType . '/' . $id . '/videos';
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);

        return $this->returning($res);
    }
}
