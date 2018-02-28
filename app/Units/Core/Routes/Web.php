<?php

namespace Orpha\Units\Core\Routes;

use Orpha\Support\Http\Routing\RouteFile;

class Web extends RouteFile
{
    /**
     * Define routes.
     *
     * @return mixed
     */
    public function routes()
    {
        $this->router->get('/', function () {
            return view('app');
        });
    }
}