<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 31/05/2017
 * Time: 10:44
 */

namespace App\Modulos\Pia\Policies;


use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Pia\Models\InformacoesFamilia;
use App\Modulos\User\Models\User;
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