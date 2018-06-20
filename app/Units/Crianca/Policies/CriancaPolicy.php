<?php

namespace Orpha\Units\Crianca\Policies;

use Orpha\Domains\User\Models\User;
use Orpha\Domains\Crianca\Models\Crianca;
use Illuminate\Auth\Access\HandlesAuthorization;

class CriancaPolicy
{
    /**
     *
     * @param User $currentUser
     * @return bool
     */
    public function index(User $currentUser)
    {
        return $currentUser->hasPermission('list-crianca');
    }

    /**
     *
     * @param  User $currentUser
     * @param Crianca $crianca
     * @return bool
     */
    public function show(User $currentUser, Crianca $crianca)
    {
        return $currentUser->hasPermission('show-crianca') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }

    /**
     *
     * @param  User  $currentUser
     * @return bool
     */
    public function create(User $currentUser)
    {
        return $currentUser->hasPermission('create-crianca');
    }

    /**
     *
     * @param  User $currentUser
     * @param Crianca $crianca
     * @return bool
     */
    public function update(User $currentUser, Crianca $crianca)
    {
        return $currentUser->hasPermission('edit-crianca') && $crianca->orfanato_id === $currentUser->orfanato_id;
    }

    /**
     *
     * @param User $currentUser
     * @param Crianca $crianca
     * @return bool
     */
    public function active(User $currentUser, Crianca $crianca)
    {
        return $currentUser->hasPermission('active-crianca') && $crianca->orfanato_id === $currentUser->orfanato_id;
    }

    /**
     *
     * @param User $currentUser
     * @param Crianca $crianca
     * @return bool
     */
    public function delete(User $currentUser, Crianca $crianca)
    {
        return $currentUser->hasPermission('disable-crianca') && $crianca->orfanato_id === $currentUser->orfanato_id;
    }
}
