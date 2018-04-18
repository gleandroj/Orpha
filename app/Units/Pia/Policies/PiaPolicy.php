<?php

namespace Orpha\Units\Pia\Policies;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Models\Pia;
use Orpha\Domains\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PiaPolicy
{
    use HandlesAuthorization;

    /**
     *
     * @param  User $currentUser
     * @param Pia $pia
     * @param Crianca $crianca
     * @return bool
     */
    public function show(User $currentUser, Pia $pia, Crianca $crianca)
    {
        return $currentUser->hasPermission('show-pia') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }

}