<?php

namespace Orpha\Domains\User\Repositories;

use Orpha\Support\Repositories\RepositoryContract;
use Orpha\Domains\User\Models\User;

interface UserRepository extends RepositoryContract
{
    /**
     * @param $email
     * @return User
     */
    public function findByEmail($email);

    /**
     *  Return sum of user by category (Active and Inactive)
     * @return object
     */
    public function getCountActiveAndInactiveUsers();
}