<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:38
 */

namespace App\Repositories;

use App\User;

class UserRepository extends AbstractRepository implements \App\Contracts\UserRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
}