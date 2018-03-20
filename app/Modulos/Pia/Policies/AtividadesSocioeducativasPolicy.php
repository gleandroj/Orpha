<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 31/05/2017
 * Time: 10:44
 */

namespace App\Modulos\Pia\Policies;


use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Pia\Models\AtividadesSocioeducativas;
use App\Modulos\User\Models\User;
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