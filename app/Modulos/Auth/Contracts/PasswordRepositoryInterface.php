<?php

namespace App\Modulos\Auth\Contracts;

/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 08/02/2017
 * Time: 09:24
 */
interface PasswordRepositoryInterface
{
    function getEmailByResetToken($token);

    function resetPassword($user, $password);
}