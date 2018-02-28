<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Support\Repositories\UnitOfWorkContract;
use Orpha\Domains\Pia\Models\DadosNecessidades;
use Orpha\Domains\Pia\Repositories\DadosNecessidadesRepository as DadosNecessidadesRepositoryInterface;

class DadosNecessidadesRepository extends AbstractRepository implements DadosNecessidadesRepositoryInterface
{
    /**
     * DadosNecessidadesRepository constructor.
     * @param DadosNecessidades $model
     * @param UnitOfWorkContract $uow
     */
    public function __construct(DadosNecessidades $model, UnitOfWorkContract $uow)
    {
        parent::__construct($model, $uow);
    }
}