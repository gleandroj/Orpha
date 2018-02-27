<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Support\Repositories\RepositoryContract;
use Orpha\Support\Repositories\UnitOfWorkContract;
use Illuminate\Database\Eloquent\Model;

class AbstractRepository implements RepositoryContract
{
    /**
     * AbstractRepository constructor.
     * @param User $model
     * @param UnitOfWorkContract $uow
     */
    public function __construct(Model $model, UnitOfWorkContract $uow)
    {
    }
}