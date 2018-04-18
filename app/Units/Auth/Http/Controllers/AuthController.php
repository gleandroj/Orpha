<?php

namespace Orpha\Units\Auth\Http\Controllers;

use Orpha\Support\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    /**
     * Return current logged user with permissions
     * @param Request $request
     * @return mixed
     */
    public function current(Request $request) {
        return $this->getCurrentUser()->load('permissions', 'orfanato');
    }
}
