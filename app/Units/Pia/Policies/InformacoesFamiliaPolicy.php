<?php

namespace Orpha\Units\Pia\Policies;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Models\InformacoesFamilia;
use Orpha\Domains\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InformacoesFamiliaPolicy
{
    use HandlesAuthorization;

    /**
     *
     * @param  User $currentUser
     * @param InformacoesFamilia $informacoesFamilia
     * @param Crianca $crianca
     * @return bool
     */
    public function show(User $currentUser, InformacoesFamilia $informacoesFamilia, Crianca $crianca)
    {
        return $currentUser->hasPermission('show-informacoes-familia') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }

    /**
     *
     * @param  User $currentUser
     * @param InformacoesFamilia $informacoesFamilia
     * @param Crianca $crianca
     * @return bool
     */
    public function update(User $currentUser, InformacoesFamilia $informacoesFamilia, Crianca $crianca)
    {
        return $currentUser->hasPermission('update-informacoes-familia') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }

}