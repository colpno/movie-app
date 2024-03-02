<?php

namespace App\Http\Controllers;

use App\Services\ApiResponse;
use App\Services\Embedding;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public $embedding;
    public $apiResponse;

    public function __construct()
    {
        $this->embedding = new Embedding();
        $this->apiResponse = new ApiResponse();
    }
}
