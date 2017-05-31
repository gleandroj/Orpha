<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 14:58
 */

namespace app\Modulos\Pia\Controllers;


use App\Http\Controllers\Controller;
use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Pia\Contracts\AtividadesSocioeducativasServiceInterface;
use App\Modulos\Pia\Models\AtividadesSocioeducativas;
use Illuminate\Http\Request;

class AtividadesSocioeducativasController extends Controller
{
    /**
     * @var AtividadesSocioeducativasServiceInterface
     */
    private $atividadesSocioeducativasService;

    /**
     * AtividadesSocioeducativasController constructor.
     * @param AtividadesSocioeducativasServiceInterface $atividadesSocioeducativasService
     */
    public function __construct(AtividadesSocioeducativasServiceInterface $atividadesSocioeducativasService)
    {
        $this->atividadesSocioeducativasService = $atividadesSocioeducativasService;
    }

    /**
     * @param Crianca $crianca
     * @return \Illuminate\Database\Eloquent\Model|AtividadesSocioeducativas
     */
    public function show(Crianca $crianca){
        $dadosNecessidades = $this->atividadesSocioeducativasService->getByCriancaId($crianca->id);

        $this->authorizeForUser($this->getCurrentUser(), 'show', [$dadosNecessidades, $crianca]);

        return $dadosNecessidades;
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