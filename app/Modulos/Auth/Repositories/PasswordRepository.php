<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 08/02/2017
 * Time: 09:27
 */

namespace App\Modulos\Auth\Repositories;


use App\Modulos\Auth\Contracts\PasswordRepositoryInterface;
use Illuminate\Support\Facades\DB;

class PasswordRepository implements PasswordRepositoryInterface
{

    /**
     * @param $token
     * @return string
     */
    function getEmailByResetToken($token)
    {
        $obj = DB::table('password_resets')->where('token', $token)->first();
        return $obj->email;
    }

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