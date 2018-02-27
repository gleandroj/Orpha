<?php

namespace Orpha\Units\User\Policies;

use Orpha\Domains\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     *
     * @param User $currentUser
     * @return bool
     */
    public function index(User $currentUser)
    {
        return $currentUser->hasPermission('list-user');
    }

    /**
     *
     * @param  User $currentUser
     * @param User $user
     * @return bool
     */
    public function show(User $currentUser, User $user)
    {
        return $currentUser->hasPermission('show-user') && $currentUser->orfanato_id === $user->orfanato_id;
    }

    /**
     *
     * @param  User  $currentUser
     * @return bool
     */
    public function create(User $currentUser)
    {
        return $currentUser->hasPermission('create-user');
    }

    /**
     *
     * @param  User  $currentUser
     * @return bool
     */
    public function update(User $currentUser, User $user)
    {
        return $currentUser->hasPermission('edit-user') && $user->orfanato_id === $currentUser->orfanato_id;
    }

    /**
     *
     * @param  User  $user
     * @return bool
     */
    public function active(User $currentUser, User $user)
    {
        return $currentUser->hasPermission('active-user') && $user->orfanato_id === $currentUser->orfanato_id;
    }

    /**
     *
     * @param  User  $user
     * @return bool
     */
    public function delete(User $currentUser, User $user)
    {
        return $currentUser->hasPermission('disable-user') && $user->orfanato_id === $currentUser->orfanato_id;
    }
}
