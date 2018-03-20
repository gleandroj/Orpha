<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 31/05/2017
 * Time: 10:44
 */

namespace App\Modulos\Pia\Policies;


use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Pia\Models\DadosNecessidades;
use App\Modulos\User\Models\User;
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