<?php

namespace Orpha\Units\Pia\Http\Controllers;

use Orpha\Domains\Crianca\Models\Crianca;
use Illuminate\Http\Request;
use Orpha\Support\Http\Controllers\Controller;
use Orpha\Domains\Pia\Models\Pia;
use Orpha\Domains\Pia\Contracts\PiaServiceContract;

class PiaController extends Controller
{
    /**
     * @var PiaServiceContract
     */
    private $piaService;

    /**
     * PiaController constructor.
     * @param PiaServiceContract $piaService
     */
    public function __construct(PiaServiceContract $piaService)
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
