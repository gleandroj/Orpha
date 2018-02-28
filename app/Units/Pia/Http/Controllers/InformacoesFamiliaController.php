<?php

namespace Orpha\Units\Pia\Http\Controllers;

use Orpha\Support\Http\Controllers\Controller;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Contracts\InformacoesFamiliaServiceContract;
use Orpha\Domains\Pia\Models\InformacoesFamilia;
use Illuminate\Http\Request;

class InformacoesFamiliaController extends Controller
{
    /**
     * @var InformacoesFamiliaServiceContract
     */
    private $informacoesFamiliaService;

    /**
     * InformacoesFamiliaController constructor.
     * @param InformacoesFamiliaServiceContract $informacoesFamiliaService
     */
    public function __construct(InformacoesFamiliaServiceContract $informacoesFamiliaService)
    {
        $this->informacoesFamiliaService = $informacoesFamiliaService;
    }

    /**
     * @param Crianca $crianca
     * @return \Illuminate\Database\Eloquent\Model|InformacoesFamilia
     */
    public function show(Crianca $crianca){
        $informacoesFamilia = $this->informacoesFamiliaService->getByCriancaId($crianca->id);

        $this->authorizeForUser($this->getCurrentUser(), 'show', [$informacoesFamilia, $crianca]);

        return $informacoesFamilia;
    }

    /**
     * @param Crianca $crianca
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Model|InformacoesFamilia
     */
    public function update(Crianca $crianca, Request $request){

        $this->authorizeForUser($this->getCurrentUser(), 'update', [$this->informacoesFamiliaService->getByCriancaId($crianca->id), $crianca]);

        return $this->informacoesFamiliaService->update($crianca->id, $request->all());
    }
}