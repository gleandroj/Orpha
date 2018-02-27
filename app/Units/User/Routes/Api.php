<?php

namespace Orpha\Units\User\Routes;

use Orpha\Support\Http\Routing\RouteFile;

class Api extends RouteFile
{
    /**
     * Define routes.
     *
     * @return mixed
     */
    public function routes()
    {
        $this->router->group(['middleware' => ['auth:api']], function () {
            $this->router->post('/users/check', 'Controllers\UserController@checkEmail');
            $this->router->get('/users/{user}/restore', 'Controllers\UserController@restore');
            $this->router->resource('/users', 'Controllers\UserController', ['except' => ['create', 'edit']]);
        });
    }
}