<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginRequest;
use App\Http\Requests\V1\LogoutRequest;
use App\Http\Requests\V1\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            User::create($request->all());
            return $this->apiResponse->success(201, "Register successfully", $request->all());
        } catch (\Throwable $th) {
            return $this->apiResponse->error($th->getMessage());
        }
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only(["email", "password"]);
        $user = User::where("email", "=", $credentials["email"])->first();

        if (!isset($user)) {
            return $this->apiResponse->error(400, "Provided email is not correct");
        }

        if (!Hash::check($credentials["password"], $user->password)) {
            return $this->apiResponse->error(400, "Provided password is not correct");
        }

        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        $tokenAbilities = ['create', 'update'];
        $token = $user->createToken("api-token", $tokenAbilities)->plainTextToken;

        return $this->apiResponse->success(
            200,
            "Login successfully",
            [
                "user" => $user,
                "token" => $token,
            ]
        );
    }

    public function logout(LogoutRequest $request)
    {
        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        $request->user()->tokens()->delete();

        $resetAutoIncrementValueTo = 1;
        DB::statement("ALTER TABLE personal_access_tokens AUTO_INCREMENT = $resetAutoIncrementValueTo;");

        return $this->apiResponse->success(200, 'Logout successfully');
    }
}
