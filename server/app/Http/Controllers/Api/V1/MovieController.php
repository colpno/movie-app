<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    private $http;
    private $tmdbBaseURL;
    private $tmdbAccessToken;

    public function __construct()
    {
        $this->http = new Client();
        $this->tmdbBaseURL = config('constants.TMDB_BASE_URL');
        $this->tmdbAccessToken = config('constants.TMDB_ACCESS_TOKEN');
    }

    /**
     * Display a listing of the movie.
     */
    public function index(Request $request)
    {
        // Handle query string
        $initialQueries = [
            'page' => 1,
        ];
        $requestQueryString = $request->getQueryString();
        parse_str($requestQueryString, $queryArray);
        $queryArray = array_merge($initialQueries, $queryArray);
        $queryString = http_build_query($queryArray);

        $url = $this->tmdbBaseURL . '/discover/movie?' . $queryString;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);
        return $res->getBody();
    }

    /**
     * Display a listing of the upcoming movie.
     */
    public function getUpcoming()
    {
        $url = $this->tmdbBaseURL . '/movie/upcoming?page=1';
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);
        return $res->getBody();
    }

    /**
     * Display a listing of the trending movie.
     */
    public function getTrending()
    {
        $url = $this->tmdbBaseURL . '/trending/movie/day';
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);
        return $res->getBody();
    }

    /**
     * Display the specified movie.
     */
    public function detail(string $id)
    {
        $url = $this->tmdbBaseURL . '/movie/' . $id;
        $res = $this->http->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->tmdbAccessToken,
                'accept' => 'application/json',
            ],
        ]);
        return $res->getBody();
    }
}
