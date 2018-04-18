<?php

namespace Orpha\Units\Pia\Routes;

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
            $this->router->get('criancas/{crianca}/pia', 'Controllers\PiaController@show');
        
            $this->router->get('criancas/{crianca}/pia/dadosenecessidades', 'Controllers\DadosNecessidadesController@show');
            $this->router->put('criancas/{crianca}/pia/dadosenecessidades', 'Controllers\DadosNecessidadesController@update');
        
            $this->router->get('criancas/{crianca}/pia/atividadessocioeducativas', 'Controllers\AtividadesSocioeducativasController@show');
            $this->router->put('criancas/{crianca}/pia/atividadessocioeducativas', 'Controllers\AtividadesSocioeducativasController@update');
        
            $this->router->get('criancas/{crianca}/pia/informacoesdafamilia', 'Controllers\InformacoesFamiliaController@show');
            $this->router->put('criancas/{crianca}/pia/informacoesdafamilia', 'Controllers\InformacoesFamiliaController@update');
        });
    }
}