<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 13:16
 */

namespace App\Modulos\Pia\Repositories;


use App\Contracts\UnitOfWorkInterface;
use App\Modulos\Pia\Contracts\DadosNecessidadesRepositoryInterface;
use App\Repositories\AbstractRepository;
use App\Modulos\Pia\Models\DadosNecessidades;

class DadosNecessidadesRepository extends AbstractRepository implements DadosNecessidadesRepositoryInterface
{
    /**
     * DadosNecessidadesRepository constructor.
     * @param DadosNecessidades $model
     * @param UnitOfWorkInterface $uow
     */
    public function __construct(DadosNecessidades $model, UnitOfWorkInterface $uow)
    {
        parent::__construct($model, $uow);
    }
}