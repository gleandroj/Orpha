<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Domains\Auth\Repositories\PasswordRepository as PasswordRepositoryInterface;

class PasswordRepository implements PasswordRepositoryInterface
{
    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Contracts\Auth\CanResetPassword  $user
     * @param  string  $password
     * @return void
     */
    function resetPassword($user, $password)
    {
        $user->forceFill([
            'password' => bcrypt($password),
        ])->save();
    }
}