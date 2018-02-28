<?php

namespace Orpha\Units\Pia\Http\Controllers;

use Orpha\Support\Http\Controllers\Controller;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Contracts\DadosNecessidadesServiceContract;
use Orpha\Domains\Pia\Models\DadosNecessidades;
use Illuminate\Http\Request;

class DadosNecessidadesController extends Controller
{
    /**
     * @var DadosNecessidadesServiceContract
     */
    private $dadosNecessidadesService;

    /**
     * DadosNecessidadesController constructor.
     * @param DadosNecessidadesServiceContract $dadosNecessidadesService
     */
    public function __construct(DadosNecessidadesServiceContract $dadosNecessidadesService)
    {
        $this->dadosNecessidadesService = $dadosNecessidadesService;
    }

    /**
     * @param Crianca $crianca
     * @return \Illuminate\Database\Eloquent\Model|DadosNecessidades
     */
    public function show(Crianca $crianca){
        $dadosNecessidades = $this->dadosNecessidadesService->getByCriancaId($crianca->id);

        $this->authorizeForUser($this->getCurrentUser(), 'show', [$dadosNecessidades, $crianca]);

        return $dadosNecessidades;
    }

    /**
     * @param Crianca $crianca
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Model|DadosNecessidades
     */
    public function update(Crianca $crianca, Request $request){

        $this->authorizeForUser($this->getCurrentUser(), 'update', [$this->dadosNecessidadesService->getByCriancaId($crianca->id), $crianca]);

        return $this->dadosNecessidadesService->update($crianca->id, $request->all());
    }
}