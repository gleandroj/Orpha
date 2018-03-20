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
use App\Modulos\Pia\Contracts\InformacoesFamiliaServiceInterface;
use App\Modulos\Pia\Models\InformacoesFamilia;
use Illuminate\Http\Request;

class InformacoesFamiliaController extends Controller
{
    /**
     * @var InformacoesFamiliaServiceInterface
     */
    private $informacoesFamiliaService;

    /**
     * InformacoesFamiliaController constructor.
     * @param InformacoesFamiliaServiceInterface $informacoesFamiliaService
     */
    public function __construct(InformacoesFamiliaServiceInterface $informacoesFamiliaService)
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