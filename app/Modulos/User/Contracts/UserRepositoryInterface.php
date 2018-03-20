<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 22/12/2016
 * Time: 15:16
 */

namespace App\Modulos\User\Contracts;

use App\Contracts\RepositoryInterface;
use App\Modulos\User\Models\User;

interface UserRepositoryInterface extends RepositoryInterface
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