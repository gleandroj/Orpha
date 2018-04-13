<?php

namespace Orpha\Units\Core\Routes;

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
        $this->router->get('/messages', function (){ return trans('messages'); });
    }
}