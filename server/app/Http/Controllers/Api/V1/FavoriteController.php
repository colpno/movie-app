<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreFavoriteRequest;
use App\Http\Resources\V1\FavoriteCollection;
use App\Http\Resources\V1\FavoriteResource;
use App\Models\Favorite;
use App\Services\V1\FavoriteQuery;
use Illuminate\Database\Eloquent\RelationNotFoundException;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    private $filter;

    public function __construct()
    {
        parent::__construct();
        $this->filter = new FavoriteQuery();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $queryItems = $this->filter->transform($request);
        $favorites = Favorite::where($queryItems);

        try {
            $this->embedding->transform($request, $favorites);
            $collection = new FavoriteCollection($favorites->paginate($request->query('perPage'))->appends($request->query()));
            return $this->apiResponse->success(200, null, $collection);
        } catch (RelationNotFoundException $e) {
            return $this->apiResponse->error(400, $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Favorite $favorite)
    {
        try {
            $this->embedding->transform(request(), $favorite);
            $resource = new FavoriteResource($favorite);
            return $this->apiResponse->success(200, null, $resource);
        } catch (RelationNotFoundException $e) {
            return $this->apiResponse->error(400, $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFavoriteRequest $request)
    {
        try {
            $favorite = new FavoriteResource(Favorite::create($request->all()));
            return $this->apiResponse->success(201, 'Favor successfully', $favorite);
        } catch (\Throwable $th) {
            return $this->apiResponse->error(500, $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorite $favorite)
    {
        try {
            $favorite->delete();
            return $this->apiResponse->success(200, 'Disfavor successfully', $favorite);
        } catch (\Throwable $th) {
            return $this->apiResponse->error(500, $th->getMessage());
        }
    }
}
