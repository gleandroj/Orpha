<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Support\Repositories\UnitOfWorkContract;
use Orpha\Domains\Pia\Models\InformacoesFamilia;
use Orpha\Domains\Pia\Repositories\InformacoesFamiliaRepository as InformacoesFamiliaRepositoryInterface;

class InformacoesFamiliaRepository extends AbstractRepository implements InformacoesFamiliaRepositoryInterface
{
    /**
     * InformacoesFamiliaRepository constructor.
     * @param InformacoesFamilia $model
     * @param UnitOfWorkContract $uow
     */
    public function __construct(InformacoesFamilia $model, UnitOfWorkContract $uow)
    {
        parent::__construct($model, $uow);
    }
}