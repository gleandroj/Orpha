<?php

namespace Orpha\Units\Pia\Policies;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Models\DadosNecessidades;
use Orpha\Domains\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DadosNecessidadesPolicy
{
    use HandlesAuthorization;

    /**
     *
     * @param  User $currentUser
     * @param DadosNecessidades $dadosNecessidades
     * @param Crianca $crianca
     * @return bool
     */
    public function show(User $currentUser, DadosNecessidades $dadosNecessidades, Crianca $crianca)
    {
        return $currentUser->hasPermission('show-dados-necessidades') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }

    /**
     *
     * @param  User $currentUser
     * @param DadosNecessidades $dadosNecessidades
     * @param Crianca $crianca
     * @return bool
     */
    public function update(User $currentUser, DadosNecessidades $dadosNecessidades, Crianca $crianca)
    {
        return $currentUser->hasPermission('update-dados-necessidades') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }
}