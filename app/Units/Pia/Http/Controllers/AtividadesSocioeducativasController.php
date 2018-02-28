<?php

namespace Orpha\Units\Pia\Http\Controllers;

use Orpha\Support\Http\Controllers\Controller;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Contracts\AtividadesSocioeducativasServiceContract;
use Orpha\Domains\Pia\Models\AtividadesSocioeducativas;
use Illuminate\Http\Request;

class AtividadesSocioeducativasController extends Controller
{
    /**
     * @var AtividadesSocioeducativasServiceContract
     */
    private $atividadesSocioeducativasService;

    /**
     * AtividadesSocioeducativasController constructor.
     * @param AtividadesSocioeducativasServiceContract $atividadesSocioeducativasService
     */
    public function __construct(AtividadesSocioeducativasServiceContract $atividadesSocioeducativasService)
    {
        $this->atividadesSocioeducativasService = $atividadesSocioeducativasService;
    }

    /**
     * @param Crianca $crianca
     * @return \Illuminate\Database\Eloquent\Model|AtividadesSocioeducativas
     */
    public function show(Crianca $crianca){
        $atividadesSocioeducativas = $this->atividadesSocioeducativasService->getByCriancaId($crianca->id);

        $this->authorizeForUser($this->getCurrentUser(), 'show', [$atividadesSocioeducativas, $crianca]);

        return $atividadesSocioeducativas;
    }

    /**
     * @param Crianca $crianca
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Model|AtividadesSocioeducativas
     */
    public function update(Crianca $crianca, Request $request){

        $this->authorizeForUser($this->getCurrentUser(), 'update', [$this->atividadesSocioeducativasService->getByCriancaId($crianca->id), $crianca]);

        return $this->atividadesSocioeducativasService->update($crianca->id, $request->all());
    }
}