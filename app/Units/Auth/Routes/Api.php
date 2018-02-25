<?php

namespace Orpha\Units\Auth\Routes;

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
            $this->router->get('/auth/current', 'Controllers\AuthController@current');
            $this->router->resource('/auth/permissions', 'Controllers\PermissionController', [
                'only' => ['index']
            ]);
        });
        $this->router->post('auth/password/email', 'Controllers\ForgotPasswordController@sendResetLinkEmail');
        $this->router->post('auth/password/token', 'Controllers\ResetPasswordController@checkResetToken');
        $this->router->post('auth/password/reset', 'Controllers\ResetPasswordController@reset');
    }
}