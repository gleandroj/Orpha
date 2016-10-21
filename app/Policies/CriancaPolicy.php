<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CriancaPolicy
{
    use HandlesAuthorization;

    /**
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function show(User $user)
    {
        return $user->permissions()->where('slug', 'show-crianca')->count() > 0;
    }

    /**
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function index(User $user)
    {
        return $user->permissions()->where('slug', 'list-crianca')->count() > 0;
    }

    /**
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function create(User $user)
    {
        return $user->permissions()->where('slug', 'create-crianca')->count() > 0;
    }

    /**
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function update(User $user)
    {
        return $user->permissions()->where('slug', 'edit-crianca')->count() > 0;
    }

    /**
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function active(User $user)
    {
        return $user->permissions()->where('slug', 'active-crianca')->count() > 0;
    }

    /**
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function delete(User $user)
    {
        return $user->permissions()->where('slug', 'delete-crianca')->count() > 0;
    }
}
