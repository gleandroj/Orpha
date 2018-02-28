<?php

namespace Orpha\Domains\Pia\Services;

use Orpha\Domains\Crianca\Contracts\CriancaServiceContract;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Contracts\PiaServiceContract;
use Orpha\Domains\Pia\Models\Pia;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PiaService implements PiaServiceContract
{
    /**
     * @var CriancaServiceContract
     */
    private $criancaService;

    /**
     * PiaService constructor.
     * @param CriancaServiceContract $criancaService
     */
    public function __construct(CriancaServiceContract $criancaService)
    {
        $this->criancaService = $criancaService;
    }

    /**
     * @param $criancaId
     * @return \Illuminate\Database\Eloquent\Model|Pia
     */
    public function getPiaByCriancaId($criancaId)
    {
        if(!$crianca = $this->criancaService->getById($criancaId)) throw (new ModelNotFoundException())->setModel(Crianca::class);

        if($crianca->pia == null)
           return $crianca->pia()->create([]);
        else
            return $crianca->pia;
    }
}