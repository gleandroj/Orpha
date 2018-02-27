<?php

namespace Orpha\Units\Crianca\Routes;

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
            $this->router->resource('/criancas', 'Controllers\CriancaController', ['except' => ['create', 'edit']]);
            $this->router->get('/criancas/{crianca}/restore', 'Controllers\CriancaController@restore');
        });
    }
}