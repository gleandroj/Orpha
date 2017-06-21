<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 31/05/2017
 * Time: 13:38
 */

namespace App\Modulos\Pia\Services;


use App\Modulos\Crianca\Contracts\CriancaServiceInterface;
use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Pia\Contracts\PiaServiceInterface;
use App\Modulos\Pia\Models\Pia;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PiaService implements PiaServiceInterface
{
    /**
     * @var CriancaServiceInterface
     */
    private $criancaService;

    /**
     * PiaService constructor.
     * @param CriancaServiceInterface $criancaService
     */
    public function __construct(CriancaServiceInterface $criancaService)
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