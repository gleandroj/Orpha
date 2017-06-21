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
use App\Modulos\Pia\Contracts\DadosNecessidadesServiceInterface;
use App\Modulos\Pia\Models\DadosNecessidades;
use Illuminate\Http\Request;

class DadosNecessidadesController extends Controller
{
    /**
     * @var DadosNecessidadesServiceInterface
     */
    private $dadosNecessidadesService;

    /**
     * DadosNecessidadesController constructor.
     * @param DadosNecessidadesServiceInterface $dadosNecessidadesService
     */
    public function __construct(DadosNecessidadesServiceInterface $dadosNecessidadesService)
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