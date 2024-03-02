<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\UpdateUserRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            $resource = new UserResource($user);
            return $this->apiResponse->success(200, null, $resource);
        } catch (\Throwable $th) {
            return $this->apiResponse->error(500, $th->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $user->update();
            return $this->apiResponse->success(200, 'Update successfully', $user);
        } catch (\Throwable $th) {
            return $this->apiResponse->error(500, $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return $this->apiResponse->success(200, 'Delete successfully', $user);
        } catch (\Throwable $th) {
            return $this->apiResponse->error(500, $th->getMessage());
        }
    }
}
