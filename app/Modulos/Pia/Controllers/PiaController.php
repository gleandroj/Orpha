<?php

namespace App\Modulos\Pia\Controllers;

use App\Modulos\Crianca\Models\Crianca;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modulos\Pia\Models\Pia;
use App\Modulos\Pia\Contracts\PiaServiceInterface;


class PiaController extends Controller
{
    /**
     * @var PiaServiceInterface
     */
    private $piaService;

    /**
     * PiaController constructor.
     * @param PiaServiceInterface $piaService
     */
    public function __construct(PiaServiceInterface $piaService)
    {
        $this->piaService = $piaService;
    }

    /**
     * @param Crianca $crianca
     * @return mixed
     */
    public function show(Crianca $crianca){
        $pia = $this->piaService->getPiaByCriancaId($crianca->id);
        $this->authorizeForUser($this->getCurrentUser(), 'show', [$pia, $crianca]);
        return $pia;
    }
}
