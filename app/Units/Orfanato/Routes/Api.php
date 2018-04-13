<?php

namespace Orpha\Units\Orfanato\Routes;

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
            $this->router->get('orpha/dashboard', 'Controllers\DashboardController@getData');
        });
    }
}