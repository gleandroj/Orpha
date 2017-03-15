<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:38
 */

namespace App\Modulos\User\Repositories;

use App\Modulos\User\Models\User;
use App\Contracts\UnitOfWorkInterface;
use App\Modulos\User\Contracts\UserRepositoryInterface;
use App\Repositories\AbstractRepository;

class UserRepository extends AbstractRepository implements UserRepositoryInterface
{
    /**
     * UserRepository constructor.
     * @param User $model
     * @param UnitOfWorkInterface $uow
     */
    public function __construct(User $model, UnitOfWorkInterface $uow)
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