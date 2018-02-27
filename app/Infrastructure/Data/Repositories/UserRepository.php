<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Domains\User\Models\User;
use Orpha\Support\Repositories\UnitOfWorkContract;
use Orpha\Domains\User\Repositories\UserRepository as UserRepositoryInterface;

class UserRepository extends AbstractRepository implements UserRepositoryInterface
{
    /**
     * UserRepository constructor.
     * @param User $model
     * @param UnitOfWorkContract $uow
     */
    public function __construct(User $model, UnitOfWorkContract $uow)
    {
        parent::__construct($model, $uow);
    }

    /**
     * @param $email
     * @return User
     */
    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }

    /**
     *  Return sum of user by category (Active and Inactive)
     * @return array
     */
    public function getCountActiveAndInactiveUsers()
    {
        return [
            'ativos' => $this->model->count(),
            'inativos' => $this->model->onlyTrashed()->count()
        ];
    }
}