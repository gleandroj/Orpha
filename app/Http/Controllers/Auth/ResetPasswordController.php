<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\UserService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{
    /**
     * @var UserService
     */
    private $userService;

    /**
     * ResetPasswordController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Send a reset link to the given user.
     *
     * @param Request|\Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sendResetEmail(Request $request)
    {
        return $this->userService->sendRestEmail($request->all());
    }
}
