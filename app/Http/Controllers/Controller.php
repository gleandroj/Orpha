<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @return \App\Modulos\User\Models\User|\Illuminate\Contracts\Auth\Authenticatable
     */
    protected function getCurrentUser()
    {
        return Auth::user();
    }
}
