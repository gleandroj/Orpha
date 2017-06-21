<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 31/05/2017
 * Time: 10:44
 */

namespace App\Modulos\Pia\Policies;


use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Pia\Models\Pia;
use App\Modulos\User\Models\User;
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