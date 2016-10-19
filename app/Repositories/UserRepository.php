<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:38
 */

namespace App\Repositories;

use App\Contracts\UnitOfWork;
use App\Exceptions\ApiException;
use App\User;

class UserRepository extends AbstractRepository implements \App\Contracts\UserRepository
{
    public function __construct(User $model, UnitOfWork $uow)
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
}