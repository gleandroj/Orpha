<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Support\Repositories\UnitOfWorkContract;
use Orpha\Domains\Pia\Models\AtividadesSocioeducativas;
use Orpha\Domains\Pia\Repositories\AtividadesSocioeducativasRepository as AtividadesSocioeducativasRepositoryInterface;

class AtividadesSocioeducativasRepository extends AbstractRepository implements AtividadesSocioeducativasRepositoryInterface
{
    /**
     * AtividadesSocioeducativasRepository constructor.
     * @param AtividadesSocioeducativas $model
     * @param UnitOfWorkInterface $uow
     */
    public function __construct(AtividadesSocioeducativas $model, UnitOfWorkInterface $uow)
    {
        parent::__construct($model, $uow);
    }
}