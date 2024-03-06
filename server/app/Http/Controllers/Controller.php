<?php

namespace App\Http\Controllers;

use App\Services\ApiQuery;
use App\Services\ApiResponse;
use App\Services\Embedding;
use App\Services\Pagination;
use App\Services\Sorting;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $embedding;
    protected $apiResponse;
    protected $sorting;
    protected $pagination;

    public function __construct()
    {
        $this->embedding = new Embedding();
        $this->apiResponse = new ApiResponse();
        $this->sorting = new Sorting();
        $this->pagination = new Pagination();
    }
}
