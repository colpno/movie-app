<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

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
     * Fetching a listing of the resource.
     */
    public function index(Request $request, string $mediaType)
    {
        $initialQueries = [
            'page' => 1,
        ];
        $queryString = mergeQueryString($request->getQueryString(), $initialQueries);

        $url = $this->tmdbBaseURL . '/discover/' . $mediaType . '?' . $queryString;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);
        $data = json_decode($res->getBody()->getContents(), true);

        return $res->getStatusCode() < 300
            ? $this->apiResponse->success($res->getStatusCode(), null, $data)
            : $this->apiResponse->error($res->getStatusCode(), $data);
    }

    /**
     * Fetching a listing of the resource by type.
     */
    public function getByType(Request $request, string $mediaType, string $type)
    {
        $url = $this->tmdbBaseURL . '/' . $mediaType . '/' . $type;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);
        $data = json_decode($res->getBody()->getContents(), true);

        return $res->getStatusCode() < 300
            ? $this->apiResponse->success($res->getStatusCode(), null, $data)
            : $this->apiResponse->error($res->getStatusCode(), $data);
    }

    /**
     * Fetching a listing of the trending resource.
     */
    public function getTrending(string $mediaType, string $time)
    {
        $url = $this->tmdbBaseURL . '/trending/' . $mediaType . '/' . $time;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);
        $data = json_decode($res->getBody()->getContents(), true);

        return $res->getStatusCode() < 300
            ? $this->apiResponse->success($res->getStatusCode(), null, $data)
            : $this->apiResponse->error($res->getStatusCode(), $data);
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
        $data = json_decode($res->getBody()->getContents(), true);

        return $res->getStatusCode() < 300
            ? $this->apiResponse->success($res->getStatusCode(), null, $data)
            : $this->apiResponse->error($res->getStatusCode(), $data);
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
        $data = json_decode($res->getBody()->getContents(), true);

        return $res->getStatusCode() < 300
            ? $this->apiResponse->success($res->getStatusCode(), null, $data)
            : $this->apiResponse->error($res->getStatusCode(), $data);
    }
}
