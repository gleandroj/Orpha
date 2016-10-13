<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:24
 */

namespace App\Contracts;


use App\User;

interface UserRepository extends Repository
{
    /**
     * @param $email
     * @return User
     */
    public function findByEmail($email);
}