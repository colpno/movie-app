<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class GenreController extends Controller
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
     * Display a listing of the resource.
     */
    public function index(string $mediaType)
    {
        $url = $this->tmdbBaseURL . '/genre/' . $mediaType . '/list';
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
