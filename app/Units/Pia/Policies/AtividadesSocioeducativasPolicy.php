<?php

namespace Orpha\Units\Pia\Policies;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Models\AtividadesSocioeducativas;
use Orpha\Domains\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AtividadesSocioeducativasPolicy
{
    use HandlesAuthorization;

    /**
     *
     * @param  User $currentUser
     * @param AtividadesSocioeducativas $atividadesSocioeducativas
     * @param Crianca $crianca
     * @return bool
     */
    public function show(User $currentUser, AtividadesSocioeducativas $atividadesSocioeducativas, Crianca $crianca)
    {
        return $currentUser->hasPermission('show-atividades-socioeducativas') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }

    /**
     *
     * @param  User $currentUser
     * @param AtividadesSocioeducativas $atividadesSocioeducativas
     * @param Crianca $crianca
     * @return bool
     */
    public function update(User $currentUser, AtividadesSocioeducativas $atividadesSocioeducativas, Crianca $crianca)
    {
        return $currentUser->hasPermission('update-atividades-socioeducativas') && $currentUser->orfanato_id === $crianca->orfanato_id;
    }

}