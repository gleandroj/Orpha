<?php

namespace Orpha\Domains\Auth\Repositories;

/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 08/02/2017
 * Time: 09:24
 */
interface PasswordRepository
{
    public function resetPassword($user, $password);
}